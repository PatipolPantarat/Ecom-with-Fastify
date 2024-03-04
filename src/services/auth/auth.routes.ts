import { FastifyInstance } from "fastify";
import { loginSchema, registerSchema } from "./auth.schema";
import { loginController, registerController } from "./auth.controller";

async function routes(fastify: FastifyInstance) {
  // POST /register - Register a new user
  fastify.post("/register", registerSchema, registerController);

  // POST /login - Login
  fastify.post("/login", loginSchema, loginController);
}

export default routes;
