import fastifyPlugin from "fastify-plugin";
import { logger } from "../utils/logger";
import mongoose from "mongoose";
async function dbConnector() {
  logger.info("Plugins: DB connecting...");
  const db = await mongoose
    .connect(process.env.MONGODB_LOCALHOST!, {
      dbName: "Ecom_DB",
    })
    .then((conn) => {
      logger.info("DB connected");
      return conn;
    })
    .catch((err) => {
      logger.error("Database connection failed", err);
    });

  if (!db) logger.info("Database not connected");
}

export default fastifyPlugin(async (fastify) => {
  // Register MongoDB / Mongoose
  await fastify.register(dbConnector);
  // Register Swagger UI
  await fastify.register(require("@fastify/swagger"), {
    swagger: {
      info: {
        title: "Ecom API",
        description: "Ecom API with Fastify",
        version: "0.1.0",
      },
      externalDocs: {
        url: "https://swagger.io",
        description: "Find more info here",
      },
      // host: ["3895lcdp-3000.asse.devtunnels.ms/"],
      host: ["localhost:3000"],
      schemes: ["http"],
      consumes: ["application/json"],
      produces: ["application/json"],
    },
  });
  await fastify.register(require("@fastify/swagger-ui"), {
    routePrefix: "/api-docs",
  });
  // Register JWT
  await fastify.register(require("@fastify/jwt"), {
    secret: process.env.JWT_SECRET,
  });
  // Register CORS
  await fastify.register(require("@fastify/cors"), {
    origin: ["http://localhost:5173"],
  });
});
