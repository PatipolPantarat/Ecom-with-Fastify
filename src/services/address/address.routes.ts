import { FastifyInstance } from "fastify";
import {
  getAddressesSchema,
  createAddressSchema,
  updateAddressSchema,
  deleteAddressSchema,
} from "./address.schema";
import {
  getAddressesController,
  createAddressController,
  updateAddressController,
  deleteAddressController,
} from "./address.controller";

async function routes(fastify: FastifyInstance) {
  // GET /get-addresses - Get all addresses by user id
  fastify.get("/get-addresses/:id", getAddressesSchema, getAddressesController);

  // POST /create-address - Create a new address
  fastify.post("/create-address", createAddressSchema, createAddressController);

  // PATCH /update-address - Update an address
  fastify.patch(
    "/update-address",
    updateAddressSchema,
    updateAddressController
  );

  // DELETE /delete-address - Delete an address by id
  fastify.delete(
    "/delete-address",
    deleteAddressSchema,
    deleteAddressController
  );
}

export default routes;
