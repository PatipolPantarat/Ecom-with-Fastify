import { FastifyReply, FastifyRequest } from "fastify";
import { IUser } from "../../utils/interfaces";
import { UserModel } from "../../models/user.model";

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
  request: FastifyRequest<{ Params: { id: number } }>,
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
  try {
    const user = new UserModel(request.body);
    await UserModel.create(user);
    return reply.code(201).send(user);
  } catch (err) {
    reply.code(500).send({ error: "Failed to create user", err });
  }
}

export async function updateUserController(
  request: FastifyRequest<{ Params: { id: number }; Body: IUser }>,
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
  request: FastifyRequest<{ Params: { id: number } }>,
  reply: FastifyReply
) {
  try {
    await UserModel.findByIdAndDelete(request.params.id);
    return reply.code(200).send({ message: "User deleted successfully" });
  } catch (err) {
    reply.code(500).send({ error: "Failed to delete user", err });
  }
}
