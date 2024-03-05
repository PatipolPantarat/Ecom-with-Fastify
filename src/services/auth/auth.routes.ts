import { FastifyInstance } from "fastify";
import {
  loginSchema,
  registerSchema,
  resetPasswordSchema,
  changePasswordSchema,
} from "./auth.schema";
import {
  loginController,
  registerController,
  resetPasswordController,
  changePasswordController,
} from "./auth.controller";

async function routes(fastify: FastifyInstance) {
  // POST /register - Register a new user
  fastify.post("/register", registerSchema, registerController);

  // POST /login - Login
  fastify.post("/login", loginSchema, loginController);

  // POST /reset-password - Reset password
  fastify.post("/reset-password", resetPasswordSchema, resetPasswordController);

  // POST /change-password - Change password
  fastify.post(
    "/change-password",
    changePasswordSchema,
    changePasswordController
  );
}

export default routes;
