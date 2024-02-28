import { FastifyInstance } from "fastify";
import { getProductsSchema, testswagger } from "./product.schema";
import {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} from "./product.controller";

async function routes(fastify: FastifyInstance) {
  fastify.get("/test", {
    schema: {
      description: "Get a list of users",
      tags: ["user"],
      response: {
        200: {
          type: "array",
          items: {
            type: "object",
            properties: {
              id: { type: "number" },
              name: { type: "string" },
            },
          },
        },
      },
    },
    handler: async (request: any, reply: any) => {
      return reply.send({ id: 1, name: "test" });
    },
  });

  // GET /products - List all products
  fastify.get("/", getProductsSchema, getProducts);

  // GET /products/:id - Get a single product
  fastify.get("/:id", getProduct);

  // POST /products - Create a new product
  fastify.post("/", createProduct);

  // PUT /products/:id - Update a product
  fastify.put("/:id", updateProduct);

  // DELETE /products/:id - Delete a product
  fastify.delete("/:id", deleteProduct);
}

export default routes;
