import { FastifyInstance } from "fastify";
import {
  getOrdersSchema,
  getOrderSchema,
  createOrderSchema,
  updateOrderSchema,
  deleteOrderSchema,
  changeStatusOrderSchema,
} from "./order.schema";
import {
  getOrdersController,
  getOrderController,
  createOrderController,
  updateOrderController,
  deleteOrderController,
  changeStatusOrdersController,
} from "./order.controller";

async function routes(fastify: FastifyInstance) {
  // GET /orders - List all orders
  fastify.get("/", getOrdersSchema, getOrdersController);

  // GET /orders/:id - Get a single order
  fastify.get("/:id", getOrderSchema, getOrderController);

  // POST /orders - Create a new order
  fastify.post("/", createOrderSchema, createOrderController);

  // PATCH /orders/:id - Update a order
  // fastify.patch("/:id", updateOrderSchema, updateOrderController);

  // DELETE /orders/:id - Delete a order
  fastify.delete("/:id", deleteOrderSchema, deleteOrderController);

  // PATCH /orders - Change order status
  fastify.patch(
    "/change-status",
    changeStatusOrderSchema,
    changeStatusOrdersController
  );
}

export default routes;
