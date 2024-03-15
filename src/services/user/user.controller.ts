import { FastifyReply, FastifyRequest } from "fastify";
import { IUser } from "../../utils/interfaces";
import { UserModel } from "../../models/user.model";
import { hashPassword, comparePassword } from "../../utils/bcrypt";
import { logger } from "../../utils/logger";
import createUserJoiSchema from "../../schema/user/create.validate";
import { verifyToken } from "../../utils/jwt";
import updateUserJoiSchema from "../../schema/user/update.validate";

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
  // Validate request params
  const id = request.params.id;
  if (!id) {
    return reply.code(400).send({ error: "User ID is required" });
  }

  try {
    const user = await UserModel.findById(id)
      .populate("addresses")
      .populate("orders");
    if (!user) {
      return reply.code(404).send({ error: "User not found" });
    }
    return reply.code(200).send(user);
  } catch (err) {
    reply.code(500).send({ error: "Failed to fetch user", err });
  }
}

export async function createUserController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  // Validate request body
  const { value, error } = createUserJoiSchema.validate(request.body);
  if (error) {
    return reply.code(400).send({ error: error.details[0].message });
  }
  value.email = value.email.toLowerCase();
  // Check if user already exists
  if (await UserModel.findOne({ "userProfile.email": value.email })) {
    return reply.code(409).send({ error: "User already exists" });
  }
  if (value.password.length < 6) {
    return reply.code(400).send({ error: "Password is too short" });
  }
  const hashedPassword = await hashPassword(value.password);
  try {
    // Create new user
    const newUser = new UserModel({
      userProfile: {
        email: value.email,
        password: hashedPassword,
        role: value.role.toLowerCase(),
      },
    });
    await UserModel.create(newUser);
    return reply.code(201).send({ message: "User created successfully" });
  } catch (err) {
    reply.code(500).send({ error: "Failed to create user", err });
  }
}

export async function updateUserController(
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
  // Validate request body
  const { value, error } = updateUserJoiSchema.validate(request.body);
  if (error) {
    return reply.code(400).send({ error: error.details[0].message });
  }
  // Update user
  try {
    await UserModel.findByIdAndUpdate(decoded.id, value);
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
