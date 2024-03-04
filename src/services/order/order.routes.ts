import { FastifyInstance } from "fastify";
import {
  getOrdersSchema,
  getOrderSchema,
  createOrderSchema,
  updateOrderSchema,
  deleteOrderSchema,
} from "./order.schema";
import {
  getOrdersController,
  getOrderController,
  createOrderController,
  updateOrderController,
  deleteOrderController,
} from "./order.controller";

async function routes(fastify: FastifyInstance) {
  // GET /orders - List all orders
  fastify.get("/orders", getOrdersSchema, getOrdersController);

  // GET /orders/:id - Get a single order
  fastify.get("/orders/:id", getOrderSchema, getOrderController);

  // POST /orders - Create a new order
  fastify.post("/orders", createOrderSchema, createOrderController);

  // PUT /orders/:id - Update a order
  fastify.patch("/orders/:id", updateOrderSchema, updateOrderController);

  // DELETE /orders/:id - Delete a order
  fastify.delete("/orders/:id", deleteOrderSchema, deleteOrderController);
}

export default routes;
