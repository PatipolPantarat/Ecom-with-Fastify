import fastify from "fastify";
import fastifyJwt from "@fastify/jwt";
import productRoutes from "./routes";

const productServer = fastify();

productServer.register(fastifyJwt, {
  secret: "your-strong-secret",
});

productServer.register(productRoutes);

export default productServer;
