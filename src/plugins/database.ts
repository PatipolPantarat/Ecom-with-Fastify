import fp from "fastify-plugin";
import mongoose from "@fastify/mongoose";

export default fp<mongoose.MongooseOptions>(async (fastify, opts) => {
  await fastify.register(mongoose, {
    url: "mongodb://localhost:27017/your_database_name", // Replace with your connection string
    ...opts,
  });

  // Use this in your routes to access your model
  fastify.decorate("db", { models: { User: fastify.mongoose.model("User") } });
});
