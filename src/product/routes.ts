import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { Product } from "./types";

let products: Product[] = [
  { id: 1, name: "Product A", description: "This is product A", price: 9.99 },
  { id: 2, name: "Product B", description: "This is product B", price: 15.99 },
  { id: 3, name: "Product C", description: "This is product C", price: 19.99 },
  { id: 4, name: "Product D", description: "This is product D", price: 24.99 },
  { id: 5, name: "Product E", description: "This is product E", price: 29.99 },
];

// Helper function to find a product by ID
const findProductIndex = (products: Product[], id: number) => {
  return products.findIndex((p) => p.id === id);
};

async function routes(fastify: FastifyInstance) {
  // GET /products - List all products
  fastify.get("/", async (request: FastifyRequest, reply: FastifyReply) => {
    return products;
  });

  // GET /products/:id - Get a single product
  fastify.get(
    "/:id",
    async (
      request: FastifyRequest<{ Params: { id: number } }>,
      reply: FastifyReply
    ) => {
      const productIndex = findProductIndex(products, +request.params.id);
      if (productIndex !== -1) {
        return products[productIndex];
      } else {
        reply.code(404).send({ error: "Product not found" });
      }
    }
  );

  // POST /products - Create a new product
  fastify.post(
    "/",
    async (request: FastifyRequest<{ Body: Product }>, reply: FastifyReply) => {
      const newProduct: Product = request.body;
      newProduct.id = products.length + 1; // Simple ID generation
      products.push(newProduct);
      reply.code(201).send(newProduct);
    }
  );

  // PUT /products/:id - Update a product
  fastify.put(
    "/:id",
    async (
      request: FastifyRequest<{ Params: { id: number }; Body: Product }>,
      reply: FastifyReply
    ) => {
      const productIndex = findProductIndex(products, +request.params.id);
      if (productIndex !== -1) {
        products[productIndex] = { ...products[productIndex], ...request.body };
        return products[productIndex];
      } else {
        reply.code(404).send({ error: "Product not found" });
      }
    }
  );

  // DELETE /products/:id - Delete a product
  fastify.delete(
    "/:id",
    async (
      request: FastifyRequest<{ Params: { id: number } }>,
      reply: FastifyReply
    ) => {
      const productIndex = findProductIndex(products, +request.params.id);
      if (productIndex !== -1) {
        products.splice(productIndex, 1);
        reply.send({ message: "Product deleted" });
      } else {
        reply.code(404).send({ error: "Product not found" });
      }
    }
  );
}

export default routes;
