import { FastifyRequest, FastifyReply } from "fastify";
import { ProductModel } from "../../models/product.model";
import { IProduct } from "../../utils/interfaces";

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
  return reply.code(201).send(newProduct);
}

export async function updateProduct(
  request: FastifyRequest<{ Params: { id: number }; Body: IProduct }>,
  reply: FastifyReply
) {
  try {
    await ProductModel.findByIdAndUpdate(request.params.id, request.body);
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
