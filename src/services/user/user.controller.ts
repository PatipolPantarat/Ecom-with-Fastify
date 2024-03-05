import { FastifyReply, FastifyRequest } from "fastify";
import { IUser } from "../../utils/interfaces";
import { UserModel } from "../../models/user.model";
import { hashPassword, comparePassword } from "../../utils/bcrypt";

export async function getUsersController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const users = await UserModel.find();
    return reply.code(200).send(users);
  } catch (err) {
    reply.code(500).send({ error: "Failed to fetch user", err });
  }
}

export async function getUserController(
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) {
  try {
    const user = await UserModel.findById(request.params.id);
    return reply.code(200).send(user);
  } catch (err) {
    reply.code(500).send({ error: "Failed to fetch user", err });
  }
}

export async function createUserController(
  request: FastifyRequest<{ Body: IUser }>,
  reply: FastifyReply
) {
  // Validate request body
  const { email, password, role } = request.body;
  if (!email || !password) {
    return reply.code(400).send({ error: "Email and password are required" });
  }
  // Check if user already exists
  if (await UserModel.findOne({ email })) {
    return reply.code(409).send({ error: "User already exists" });
  }
  if (password.length < 6) {
    return reply.code(400).send({ error: "Password is too short" });
  }
  const hashedPassword = await hashPassword(password);
  try {
    const newUser = new UserModel({
      email: email.toLowerCase(),
      password: hashedPassword,
      role,
    });
    await UserModel.create(newUser);
    return reply.code(201).send({ message: "User created successfully" });
  } catch (err) {
    reply.code(500).send({ error: "Failed to create user", err });
  }
}

export async function updateUserController(
  request: FastifyRequest<{ Params: { id: string }; Body: IUser }>,
  reply: FastifyReply
) {
  try {
    await UserModel.findByIdAndUpdate(request.params.id, request.body);
    return reply.code(200).send({
      message: "User updated successfully",
    });
  } catch (err) {
    reply.code(500).send({ error: "Failed to update user", err });
  }
}

export async function deleteUserController(
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) {
  try {
    await UserModel.findByIdAndDelete(request.params.id);
    return reply.code(200).send({ message: "User deleted successfully" });
  } catch (err) {
    reply.code(500).send({ error: "Failed to delete user", err });
  }
}
