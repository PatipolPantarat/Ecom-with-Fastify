import { FastifyRequest, FastifyReply } from "fastify";
import { logger } from "../../utils/logger";
import { UserModel } from "../../models/user.model";
import { IUser } from "../../utils/interfaces";
import { verifyToken, generateToken } from "../../utils/jwt";
import { hashPassword, comparePassword } from "../../utils/bcrypt";
import {
  generateRandomPassword,
  sendResetPassword,
} from "../../utils/nodemailer";
import registerJoiSchema from "../../schema/auth/register.validate";
import loginJoiSchema from "../../schema/auth/login.validate";
import resetJoiSchema from "../../schema/auth/reset.validate";
import changeJoiSchema from "../../schema/auth/change.validate";

export async function meController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  // Get token
  const token = request.headers.authorization;
  if (!token || !token.startsWith("Bearer ")) {
    return reply.code(401).send({ error: "Unauthorized" });
  }
  // Verify token
  const decoded = verifyToken(token.split(" ")[1]);
  if (!decoded) {
    return reply.code(401).send({ error: "Invalid token" });
  }
  // Find user
  try {
    const user = await UserModel.findOne({ _id: decoded.id });
    if (!user) {
      return reply.code(404).send({ error: "User not found" });
    }
    return reply.code(200).send(user);
  } catch (err) {
    logger.error(err);
    return reply.code(500).send({ error: "Internal server error" });
  }
}

export async function loginController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  // Validate request body
  const { value, error } = loginJoiSchema.validate(request.body);
  if (error) {
    return reply.code(400).send({ error: error.details[0].message });
  }
  value.email = value.email.toLowerCase();
  try {
    const user = await UserModel.findOne({
      email: value.email,
    });
    if (!user) {
      return reply.code(401).send({ error: "user not found" });
    }
    const isMatch = await comparePassword(value.password, user.password);
    if (!isMatch) {
      logger.error(`User ${user.email} failed to login`);
      return reply.code(401).send({ error: "Invalid password" });
    }
    logger.info(`User ${user.email} logged in successfully`);
    const token = generateToken(user._id);
    return reply.code(200).send({ message: "Login successful", token });
  } catch (err) {
    reply.code(500).send({ error: "Login failed", err });
  }
}

export async function registerController(
  request: FastifyRequest<{ Body: { email: string; password: string } }>,
  reply: FastifyReply
) {
  try {
    // Validate request body
    const { value, error } = registerJoiSchema.validate(request.body);
    if (error) {
      return reply.code(400).send({ error: error.details[0].message });
    }
    value.email = value.email.toLowerCase();

    // Check if user already exists
    const user = await UserModel.findOne({ email: value.email });
    if (user) {
      return reply.code(409).send({ error: "User already exists" });
    }

    // Hash password
    const hashedPassword = await hashPassword(value.password);

    // Create new user
    const newUser = new UserModel({
      email: value.email,
      password: hashedPassword,
      role: "user",
    });
    await UserModel.create(newUser);
    // Generate token
    const token = generateToken(value.email);
    return reply.code(201).send({ message: "Registration successful", token });
  } catch (err: any) {
    reply.code(500).send({ error: "Registration failed", err });
  }
}

export async function resetPasswordController(
  request: FastifyRequest<{ Body: { email: string } }>,
  reply: FastifyReply
) {
  // Validate request body
  const { value, error } = resetJoiSchema.validate(request.body);
  if (error) {
    return reply.code(400).send({ error: error.details[0].message });
  }
  value.email = value.email.toLowerCase();
  try {
    // Find user by email
    const user = await UserModel.findOne({ email: value.email });
    if (!user) {
      return reply.code(404).send({ error: "User not found" });
    }
    // Generate new password
    const randomPassword = generateRandomPassword();
    // Send email with random password
    await sendResetPassword(value.email, randomPassword);
    // Update user's password
    user.password = await hashPassword(randomPassword);
    await user.save();
    // Return success message
    return reply.code(200).send({
      message: "Reset password email sent successfully",
    });
  } catch (err) {
    reply.code(500).send({ error: "Reset password failed", err });
  }
}

export async function changePasswordController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  // Get token
  const token = request.headers.authorization;
  if (!token || !token.startsWith("Bearer ")) {
    return reply.code(401).send({ error: "Unauthorized" });
  }
  console.log(token);
  // Verify token
  const decoded = verifyToken(token.split(" ")[1]);
  if (!decoded) {
    return reply.code(401).send({ error: "Invalid token" });
  }
  console.log(decoded);
  // Validate request body
  const { value, error } = changeJoiSchema.validate(request.body);
  if (error) {
    return reply.code(400).send({ error: error.details[0].message });
  }
  try {
    // Find user by email
    const user = await UserModel.findById(decoded.id);
    if (!user) {
      return reply.code(404).send({ error: "User not found" });
    }
    // Compare old password
    const isMatch = await comparePassword(value.oldPassword, user.password);
    if (!isMatch) {
      return reply.code(401).send({ error: "Invalid old password" });
    }
    // Update user's password
    user.password = await hashPassword(value.newPassword);
    await user.save();
    // Return success message
    return reply.code(200).send({
      message: "Password changed successfully",
    });
  } catch (err) {
    reply.code(500).send({ error: "Change password failed", err });
  }
}
