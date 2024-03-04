import fb from "fastify-plugin";
import mongoose from "mongoose";
import { logger } from "../utils/logger";

export default fb(async (fastify, opts) => {
  logger.info("Database connecting...");
  const db = await mongoose
    .connect(process.env.MONGODB_LOCALHOST!, {
      dbName: "Ecom_DB",
    })
    .then((conn) => {
      logger.info("Database connected");
      return conn;
    })
    .catch((err) => {
      logger.error("Database connection failed", err);
    });

  if (!db) logger.info("Database not connected");
});
