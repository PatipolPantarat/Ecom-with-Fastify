import fastify, { FastifyInstance } from "fastify";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";
// import authRoutes from "./auth/auth.routes";
// import userRoutes from "./user/routes";
import productRoutes from "./services/product/product.routes";

const server: FastifyInstance = fastify({});

server.register(fastifySwagger, {
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

// Register Swagger UI
server.register(fastifySwaggerUi, {
  routePrefix: "/api-docs",
});

// Register service routes
// server.register(authRoutes, { prefix: "/api/v1/auth" });
// server.register(userRoutes, { prefix: "/users" });
server.register(productRoutes, { prefix: "/api/v1/products" });
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
