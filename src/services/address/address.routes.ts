import { FastifyInstance } from "fastify";
import { createAddressSchema } from "./address.schema";
import { createAddressController } from "./address.controller";

async function routes(fastify: FastifyInstance) {
  // POST /create-address - Create a new address
  fastify.post("/create-address", createAddressSchema, createAddressController);
}

export default routes;
