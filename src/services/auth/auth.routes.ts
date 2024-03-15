import { FastifyInstance } from "fastify";
import {
  meSchema,
  loginSchema,
  registerSchema,
  resetPasswordSchema,
  changePasswordSchema,
} from "./auth.schema";
import {
  meController,
  loginController,
  registerController,
  resetPasswordController,
  changePasswordController,
} from "./auth.controller";

async function routes(fastify: FastifyInstance) {
  // GET /me - Get current user
  fastify.get("/me", meSchema, meController);

  // POST /register - Register a new user
  fastify.post("/register", registerSchema, registerController);

  // POST /login - Login
  fastify.post("/login", loginSchema, loginController);

  // POST /reset-password - Reset password
  fastify.post("/reset-password", resetPasswordSchema, resetPasswordController);

  // PUT /change-password - Change password
  fastify.put(
    "/change-password",
    changePasswordSchema,
    changePasswordController
  );
}

export default routes;
