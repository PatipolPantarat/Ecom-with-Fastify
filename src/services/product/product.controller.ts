import { FastifyRequest, FastifyReply } from "fastify";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
}

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

// export async function test(
//   request: FastifyRequest,
//   reply: FastifyReply
// ): Promise<FastifyReply> {
//   return reply.send({ id: 1, name: "test_test" });
// }

export async function getProducts(
  request: FastifyRequest,
  reply: FastifyReply
): Promise<FastifyReply> {
  return reply.send(products);
}

export async function getProduct(
  request: FastifyRequest<{ Params: { id: number } }>,
  reply: FastifyReply
): Promise<FastifyReply> {
  const productIndex = findProductIndex(products, +request.params.id);
  if (productIndex !== -1) {
    return reply.send(products[productIndex]);
  } else {
    return reply.code(404).send({ error: "Product not found" });
  }
}

export async function createProduct(
  request: FastifyRequest<{ Body: Product }>,
  reply: FastifyReply
): Promise<FastifyReply> {
  const newProduct: Product = request.body;
  newProduct.id = products.length + 1; // Simple ID generation
  products.push(newProduct);
  return reply.code(201).send(newProduct);
}

export async function updateProduct(
  request: FastifyRequest<{ Params: { id: number }; Body: Product }>,
  reply: FastifyReply
): Promise<FastifyReply> {
  const productIndex = findProductIndex(products, +request.params.id);
  if (productIndex !== -1) {
    products[productIndex] = request.body;
    return reply.send(products[productIndex]);
  } else {
    return reply.code(404).send({ error: "Product not found" });
  }
}

export async function deleteProduct(
  request: FastifyRequest<{ Params: { id: number } }>,
  reply: FastifyReply
): Promise<FastifyReply> {
  const productIndex = findProductIndex(products, +request.params.id);
  if (productIndex !== -1) {
    products.splice(productIndex, 1);
    return reply.send();
  } else {
    return reply.code(404).send({ error: "Product not found" });
  }
}
