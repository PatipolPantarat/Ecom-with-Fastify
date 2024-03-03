import fastify, { FastifyInstance } from "fastify";
import dotenv from "dotenv";
dotenv.config();
import connectDB from "./plugins/database";

// Import service routes
import productRoutes from "./services/product/product.routes";
import userRoutes from "./services/user/user.routes";
// import authRoutes from "./services/auth/auth.routes";
// import testRoutes from "./services/test/test.routes";

const server: FastifyInstance = fastify({});
server.register(connectDB);
// server.register(require("@fastify/mongodb"), {
//   forceClose: true,
//   url: process.env.MONGODB_URI,
// });
server.register(require("@fastify/jwt"), {
  secret: "your-strong-secret",
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
// server.register(testRoutes, { prefix: "/api/v1/test" });
// server.register(authRoutes, { prefix: "/api/v1/auth" });
server.register(productRoutes, { prefix: "/api/v1/products" });
server.register(userRoutes, { prefix: "/api/v1/users" });

const start = async () => {
  try {
    await server.ready();
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
