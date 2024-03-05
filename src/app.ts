import fastify, { FastifyInstance } from "fastify";
import dotenv from "dotenv";
dotenv.config();
import connectDB from "./plugins/database";
import { logger } from "./utils/logger";

// Import service routes
import userRoutes from "./services/user/user.routes";
import productRoutes from "./services/product/product.routes";
import categoryRoutes from "./services/category/category.routes";
import authRoutes from "./services/auth/auth.routes";
import orderRoutes from "./services/order/order.routes";

const server: FastifyInstance = fastify();

server.register(connectDB);
server.register(require("@fastify/jwt"), {
  secret: process.env.JWT_SECRET,
});
server.register(require("@fastify/cors"));

// Register Swagger UI
server.register(require("@fastify/swagger"), {
  swagger: {
    info: {
      title: "Ecom API",
      description: "Ecom API with Fastify",
      version: "0.1.0",
    },
    schemes: ["http"],
    consumes: ["application/json"],
    produces: ["application/json"],
  },
});
server.register(require("@fastify/swagger-ui"), {
  routePrefix: "/api-docs",
});

// Register service routes
server.register(authRoutes, { prefix: "/api/v1/auth" });
server.register(userRoutes, { prefix: "/api/v1/users" });
server.register(productRoutes, { prefix: "/api/v1/products" });
server.register(categoryRoutes, { prefix: "/api/v1/categories" });
server.register(orderRoutes, { prefix: "/api/v1/orders" });

const start = async () => {
  try {
    await server.ready();
    await server.listen({ port: 3000 });
    const address = server.server.address();
    const port = typeof address === "string" ? address : address?.port;
    logger.info(`Server is now listening on http://localhost:${port}`);
  } catch (err) {
    logger.error("Failed to start server", err);
    process.exit(1);
  }
};

start();
