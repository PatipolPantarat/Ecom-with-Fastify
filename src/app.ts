import Fastify, { FastifyInstance } from "fastify";
import dotenv from "dotenv";
dotenv.config();
import { logger } from "./utils/logger";
import fastifyPlugins from "./plugins/plugins";

// Import service routes
import userRoutes from "./services/user/user.routes";
import productRoutes from "./services/product/product.routes";
import categoryRoutes from "./services/category/category.routes";
import authRoutes from "./services/auth/auth.routes";
import orderRoutes from "./services/order/order.routes";
import addressRoutes from "./services/address/address.routes";

const server: FastifyInstance = Fastify();

server.register(fastifyPlugins);

// Register service routes
server.register(authRoutes, { prefix: `${process.env.API_URL}/auth` });
server.register(userRoutes, { prefix: `${process.env.API_URL}/users` });
server.register(productRoutes, { prefix: `${process.env.API_URL}/products` });
server.register(categoryRoutes, {
  prefix: `${process.env.API_URL}/categories`,
});
server.register(orderRoutes, { prefix: `${process.env.API_URL}/orders` });
server.register(addressRoutes, { prefix: `${process.env.API_URL}/address` });

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
