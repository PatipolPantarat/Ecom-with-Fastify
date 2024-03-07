import { FastifyRequest, FastifyReply } from "fastify";
import { ProductModel } from "../../models/product.model";
import { IProduct } from "../../utils/interfaces";
import createProductJoiSchema from "../../schema/product/create.validate";
import updateProductJoiSchema from "../../schema/product/update.validate";

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
  // Validate request body
  const { value, error } = createProductJoiSchema.validate(request.body);
  if (error) {
    return reply.code(400).send({ error: error.details[0].message });
  }
  // Convert name to lowercase
  value.name = value.name.toLowerCase();
  // Check if product already exists
  const product = await ProductModel.findOne({
    name: value.name,
  });
  if (product) {
    return reply.code(409).send({ error: "Product already exists" });
  }
  // Create new product
  try {
    const newProduct = new ProductModel(value);
    await ProductModel.create(newProduct);
    return reply.code(201).send(newProduct);
  } catch (err) {
    reply.code(500).send({ error: "Failed to create product" });
  }
}

export async function updateProduct(
  request: FastifyRequest<{ Params: { id: number }; Body: IProduct }>,
  reply: FastifyReply
) {
  console.log("params: ", request.params.id);
  console.log("body: ", request.body);
  // Validate request body
  const { value, error } = updateProductJoiSchema.validate(request.body);
  if (error) {
    return reply.code(400).send({ error: error.details[0].message });
  }
  try {
    await ProductModel.findByIdAndUpdate(request.params.id, value);
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
