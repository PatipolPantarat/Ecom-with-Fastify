import { FastifyInstance } from "fastify";
import {
  getProductsSchema,
  getProductSchema,
  createProductSchema,
  updateProductSchema,
  deleteProductSchema,
} from "./product.schema";
import {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} from "./product.controller";

async function routes(fastify: FastifyInstance) {
  // fastify.addHook("preValidation", async (request, reply) => {
  //   if (!request.headers.authorization) {
  //     return reply.code(401).send({ error: "Unauthorized" });
  //   }
  //   const token = request.headers.authorization.split(" ")[1];
  //   try {
  //     const decoded = fastify.jwt.verify(token);
  //     request.user = decoded;
  //   } catch (err) {
  //     return reply.code(401).send({ error: "Invalid token" });
  //   }
  // });

  // GET /products - List all products
  fastify.get("/", getProductsSchema, getProducts);

  // GET /products/:id - Get a single product
  fastify.get("/:id", getProductSchema, getProduct);

  // POST /products - Create a new product
  fastify.post("/", createProductSchema, createProduct);

  // PUT /products/:id - Update a product
  fastify.put("/:id", updateProductSchema, updateProduct);

  // DELETE /products/:id - Delete a product
  fastify.delete("/:id", deleteProductSchema, deleteProduct);
}

export default routes;
