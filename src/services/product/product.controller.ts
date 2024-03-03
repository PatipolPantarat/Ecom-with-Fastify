import { FastifyRequest, FastifyReply } from "fastify";
import { ProductModel } from "../../models/product.model";
import { IProduct } from "../../utils/interfaces";
// interface Product {
//   id: number;
//   name: string;
//   description: string;
//   price: number;
// }

// let products: Product[] = [
//   { id: 1, name: "Product A", description: "This is product A", price: 9.99 },
//   { id: 2, name: "Product B", description: "This is product B", price: 15.99 },
//   { id: 3, name: "Product C", description: "This is product C", price: 19.99 },
//   { id: 4, name: "Product D", description: "This is product D", price: 24.99 },
//   { id: 5, name: "Product E", description: "This is product E", price: 29.99 },
// ];

// Helper function to find a product by ID
// const findProductIndex = (products: Product[], id: number) => {
//   return products.findIndex((p) => p.id === id);
// };

export async function getProducts(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const products = await ProductModel.find();
    return reply.code(200).send(products);
  } catch (err) {
    reply.code(500).send({ error: "Failed to fetch products" });
  }
}

export async function getProduct(
  request: FastifyRequest<{ Params: { id: number } }>,
  reply: FastifyReply
) {
  try {
    const product = await ProductModel.findById(request.params.id);
    console.log("product: ", product);
    return reply.code(200).send(product);
  } catch (err) {
    reply.code(500).send({ error: "Failed to fetch product" });
  }
}

export async function createProduct(
  request: FastifyRequest<{ Body: IProduct }>,
  reply: FastifyReply
) {
  const newProduct = new ProductModel(request.body);
  await ProductModel.create(newProduct);
  console.log("newProduct: ", newProduct);
  return reply.code(201).send(newProduct);
}

export async function updateProduct(
  request: FastifyRequest<{ Params: { id: number }; Body: IProduct }>,
  reply: FastifyReply
) {
  try {
    const updatedProduct = await ProductModel.findByIdAndUpdate(
      request.params.id,
      request.body
    );
    return reply.code(200).send({
      message: "Product updated successfully",
    });
  } catch (err) {
    reply.code(500).send({ error: "Failed to update product" });
  }
}

export async function deleteProduct(
  request: FastifyRequest<{ Params: { id: number } }>,
  reply: FastifyReply
) {
  try {
    await ProductModel.findByIdAndDelete(request.params.id);
    return reply.code(200).send({ message: "Product deleted successfully" });
  } catch (err) {
    reply.code(500).send({ error: "Failed to delete product" });
  }
}
