import { FastifyInstance } from "fastify";
import { createAddressSchema, updateAddressSchema } from "./address.schema";
import {
  createAddressController,
  updateAddressController,
} from "./address.controller";

async function routes(fastify: FastifyInstance) {
  // GET /get-addresses - Get all addresses
  // fastify.get("/get-addresses", createAddressSchema, createAddressController);

  // POST /create-address - Create a new address
  fastify.post("/create-address", createAddressSchema, createAddressController);

  // PATCH /update-address - Update an address
  fastify.patch(
    "/update-address",
    updateAddressSchema,
    updateAddressController
  );

  // DELETE /delete-address - Delete an address
  // fastify.delete("/delete-address", createAddressSchema, createAddressController);
}

export default routes;
