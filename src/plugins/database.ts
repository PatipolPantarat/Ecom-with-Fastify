import fb from "fastify-plugin";
import { logger } from "../utils/logger";
import mongoose from "mongoose";

export default fb(async (fastify, opts) => {
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
});
