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

export async function loginController(
  request: FastifyRequest<{ Body: IUser }>,
  reply: FastifyReply
) {
  const { email, password } = request.body;
  const lowerEmail = email.toLowerCase();
  try {
    const user = await UserModel.findOne({ email: lowerEmail });
    if (!user) {
      return reply.code(401).send({ error: "user not found" });
    }
    const isMatch = await comparePassword(password, user.password);
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
  request: FastifyRequest<{ Body: IUser }>,
  reply: FastifyReply
) {
  const { email, password } = request.body;
  const lowerEmail = email.toLowerCase();
  // Check if user already exists
  const user = await UserModel.findOne({ email: lowerEmail });
  if (user) {
    return reply.code(409).send({ error: "User already exists" });
  }
  if (password.length < 6) {
    return reply.code(400).send({ error: "Password is too short" });
  }
  const hashedPassword = await hashPassword(password);
  try {
    const newUser = new UserModel({
      email: lowerEmail,
      password: hashedPassword,
      role: "user",
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
  const { email } = request.body;
  const lowerEmail = email.toLowerCase();
  try {
    // Find user by email
    const user = await UserModel.findOne({ email: lowerEmail });
    if (!user) {
      return reply.code(404).send({ error: "User not found" });
    }
    // Generate new password
    const randomPassword = generateRandomPassword();
    // Send email with random password
    await sendResetPassword(lowerEmail, randomPassword);
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
  request: FastifyRequest<{
    Body: { email: string; oldPassword: string; newPassword: string };
  }>,
  reply: FastifyReply
) {
  const { email, oldPassword, newPassword } = request.body;
  const lowerEmail = email.toLowerCase();
  try {
    // Find user by email
    const user = await UserModel.findOne({ email: lowerEmail });
    if (!user) {
      return reply.code(404).send({ error: "User not found" });
    }
    // Compare old password
    const isMatch = await comparePassword(oldPassword, user.password);
    if (!isMatch) {
      return reply.code(401).send({ error: "Invalid old password" });
    }
    // Update user's password
    user.password = await hashPassword(newPassword);
    await user.save();
    // Return success message
    return reply.code(200).send({
      message: "Password changed successfully",
    });
  } catch (err) {
    reply.code(500).send({ error: "Change password failed", err });
  }
}
