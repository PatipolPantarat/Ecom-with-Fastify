import fastify, { FastifyRequest, FastifyReply } from "fastify";
import { logger } from "../../utils/logger";
import { UserModel } from "../../models/user.model";
import { IUser } from "../../utils/interfaces";
import { generateToken } from "../../utils/jwt";
import { hashPassword, comparePassword } from "../../utils/bcrypt";
import {
  generateRandomPassword,
  sendResetPassword,
} from "../../utils/nodemailer";
import registerJoiSchema from "../../schema/auth/register.validate";
import loginJoiSchema from "../../schema/auth/login.validate";
import resetJoiSchema from "../../schema/auth/reset.validate";
import { changePasswordSchema } from "./auth.schema";
import changeJoiSchema from "../../schema/auth/change.validate";

export async function loginController(
  request: FastifyRequest<{ Body: { email: string; password: string } }>,
  reply: FastifyReply
) {
  // Validate request body
  const { value, error } = loginJoiSchema.validate(request.body);
  if (error) {
    return reply.code(400).send({ error: error.details[0].message });
  }
  const { email, password } = value;
  const lowerEmail = email.toLowerCase();
  try {
    const user = await UserModel.findOne({
      "userProfile.email": lowerEmail,
    });
    if (!user) {
      return reply.code(401).send({ error: "user not found" });
    }
    const isMatch = await comparePassword(password, user.userProfile.password);
    if (!isMatch) {
      return reply.code(401).send({ error: "Invalid password" });
    }
    const token = generateToken({ lowerEmail });
    return reply.code(200).send({ message: "Login successful", token });
  } catch (err) {
    reply.code(500).send({ error: "Login failed", err });
  }
}

export async function registerController(
  request: FastifyRequest<{ Body: { email: string; password: string } }>,
  reply: FastifyReply
) {
  // Validate request body
  const { value, error } = registerJoiSchema.validate(request.body);
  if (error) {
    return reply.code(400).send({ error: error.details[0].message });
  }
  console.log(value);
  const { email, password } = value;
  const lowerEmail = email.toLowerCase();

  // Check if user already exists
  const user = await UserModel.findOne({ "userProfile.email": lowerEmail });
  if (user) {
    return reply.code(409).send({ error: "User already exists" });
  }
  if (password.length < 6) {
    return reply.code(400).send({ error: "Password is too short" });
  }
  const hashedPassword = await hashPassword(password);
  try {
    const newUser = new UserModel({
      userProfile: {
        email: lowerEmail,
        password: hashedPassword,
        role: "user",
      },
    });
    await UserModel.create(newUser);
    return reply.code(201).send({ message: "Registration successful" });
  } catch (err) {
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
  const { email } = value;
  const lowerEmail = email.toLowerCase();
  try {
    // Find user by email
    const user = await UserModel.findOne({ "userProfile.email": lowerEmail });
    if (!user) {
      return reply.code(404).send({ error: "User not found" });
    }
    // Generate new password
    const randomPassword = generateRandomPassword();
    // Send email with random password
    await sendResetPassword(lowerEmail, randomPassword);
    // Update user's password
    user.userProfile.password = await hashPassword(randomPassword);
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
  request: FastifyRequest<{
    Body: { email: string; oldPassword: string; newPassword: string };
  }>,
  reply: FastifyReply
) {
  // Validate request body
  const { value, error } = changeJoiSchema.validate(request.body);
  if (error) {
    return reply.code(400).send({ error: error.details[0].message });
  }
  const { email, oldPassword, newPassword } = value;
  const lowerEmail = email.toLowerCase();
  try {
    // Find user by email
    const user = await UserModel.findOne({ "userProfile.email": lowerEmail });
    if (!user) {
      return reply.code(404).send({ error: "User not found" });
    }
    // Compare old password
    const isMatch = await comparePassword(
      oldPassword,
      user.userProfile.password
    );
    if (!isMatch) {
      return reply.code(401).send({ error: "Invalid old password" });
    }
    // Update user's password
    user.userProfile.password = await hashPassword(newPassword);
    await user.save();
    // Return success message
    return reply.code(200).send({
      message: "Password changed successfully",
    });
  } catch (err) {
    reply.code(500).send({ error: "Change password failed", err });
  }
}
