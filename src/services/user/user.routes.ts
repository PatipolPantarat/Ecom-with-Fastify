import { FastifyInstance } from "fastify";
import {
  getUsersSchema,
  getUserSchema,
  createUserSchema,
  updateUserSchema,
  deleteUserSchema,
} from "./user.schema";
import {
  getUsersController,
  getUserController,
  createUserController,
  updateUserController,
  deleteUserController,
} from "./user.controller";

async function routes(fastify: FastifyInstance) {
  // GET /users - List all users
  fastify.get("/", getUsersSchema, getUsersController);
  // GET /users/:id - Get a single user
  fastify.get("/:id", getUserSchema, getUserController);
  // POST /users - Create a new user
  fastify.post("/", createUserSchema, createUserController);
  // PUT /users/:id - Update a user
  fastify.put("/:id", updateUserSchema, updateUserController);
  // DELETE /users/:id - Delete a user
  fastify.delete("/:id", deleteUserSchema, deleteUserController);
}

export default routes;
