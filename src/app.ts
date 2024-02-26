import Fastify, { FastifyInstance, RouteShorthandOptions } from "fastify";
import authRoutes from "./auth/routes";
// import userRoutes from "./user/routes";
import productRoutes from "./product/routes";

const server: FastifyInstance = Fastify({});

// Register service routes
server.register(authRoutes, { prefix: "/auth" });
// server.register(userRoutes, { prefix: "/users" });
server.register(productRoutes, { prefix: "/products" });

const start = async () => {
  try {
    await server.listen({ port: 3000 });
    const address = server.server.address();
    const port = typeof address === "string" ? address : address?.port;
    console.log(`Server listening on http://localhost:${port}`);
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

start();
