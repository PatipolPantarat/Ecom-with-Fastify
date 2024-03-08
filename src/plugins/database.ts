import fastifyPlugin from "fastify-plugin";
import { logger } from "../utils/logger";
import mongoose from "mongoose";

// async function dbConnector(fastify: FastifyInstance, opts: any) {
//   fastify.decorate("db", mongoose);
// }

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
export default fastifyPlugin(dbConnector);
