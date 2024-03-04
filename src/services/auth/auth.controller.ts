import fastify, { FastifyRequest, FastifyReply } from "fastify";
import { logger } from "../../utils/logger";
import { UserModel } from "../../models/user.model";
import { IUser } from "../../utils/interfaces";
import { generateToken } from "../../utils/jwt";
import { hashPassword, comparePassword } from "../../utils/bcrypt";

export async function loginController(
  request: FastifyRequest<{ Body: IUser }>,
  reply: FastifyReply
) {
  const { email, password } = request.body;
  try {
    const user = await UserModel.findOne({ email });
    if (!user) {
      return reply.code(401).send({ error: "user not found" });
    }
    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      return reply.code(401).send({ error: "Invalid password" });
    }
    const token = generateToken({ email });
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
  if (!email || !password) {
    return reply.code(400).send({ error: "Email and password are required" });
  }
  if (await UserModel.findOne({ email })) {
    return reply.code(409).send({ error: "User already exists" });
  }
  if (password.length < 6) {
    return reply.code(400).send({ error: "Password is too short" });
  }
  const hashedPassword = await hashPassword(password);
  try {
    const newUser = new UserModel({
      email,
      password: hashedPassword,
      role: "user",
    });
    await UserModel.create(newUser);
    return reply.code(201).send({ message: "Registration successful" });
  } catch (err) {
    reply.code(500).send({ error: "Registration failed", err });
  }
}
