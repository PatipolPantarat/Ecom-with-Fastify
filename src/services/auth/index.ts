import fastify from "fastify";
import fastifyJwt from "@fastify/jwt";
import authRoutes from "./auth.routes";
const authServer = fastify();

authServer.register(fastifyJwt, {
  secret: "your-strong-secret",
});

authServer.register(authRoutes);

export default authServer;
