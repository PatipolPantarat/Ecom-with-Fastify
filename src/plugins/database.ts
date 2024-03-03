import fb from "fastify-plugin";
import mongoose from "mongoose";

export default fb(async (fastify, opts) => {
  const db = await mongoose
    .connect(process.env.MONGODB_URI!, {
      dbName: "Ecom_DB",
    })
    .then((conn) => {
      console.log("Database connected");
      return conn;
    })
    .catch(console.error);

  if (!db) throw new Error("Database not connected");
});
