import { FastifyRequest, FastifyReply } from "fastify";
import { ProductModel } from "../../models/product.model";
import { IProduct } from "../../utils/interfaces";
import createProductJoiSchema from "../../schema/product/create.validate";
import updateProductJoiSchema from "../../schema/product/update.validate";
import { logger } from "../../utils/logger";

export async function getProducts(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const { name } = request.query as { name?: string };
  try {
    const products = await ProductModel.find(
      name
        ? {
            name: { $regex: name?.toLowerCase(), $options: "i" },
            stock: { $gt: 0 },
            status: "active",
            isDeleted: false,
          }
        : {
            stock: { $gt: 0 },
            status: "active",
            isDeleted: false,
          }
    ).populate("category");
    return reply.code(200).send(products);
  } catch (err) {
    reply.code(500).send({ error: "Failed to fetch products" });
  }
}

export async function getProduct(request: FastifyRequest, reply: FastifyReply) {
  // Validate request params
  const { id } = request.params as { id: string };
  if (!id) {
    return reply.code(400).send({ error: "Product ID is required" });
  }
  try {
    const product = await ProductModel.findById(id);
    // Check if product status is active or inactive
    if (!product) {
      return reply.code(404).send({ error: "Product not found" });
    }
    if (product.status === "inactive" || product.isDeleted) {
      return reply.code(404).send({ error: "Product not found" });
    }
    // Check if product stock is greater than 0
    if (product.stock <= 0) {
      return reply.code(404).send({ error: "Product out of stock" });
    }
    // Populate category
    product.populate("category");
    // Return product
    return reply.code(200).send(product);
  } catch (err) {
    reply.code(500).send({ error: "Failed to fetch product" });
  }
}

export async function createProduct(
  request: FastifyRequest,
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
  request: FastifyRequest,
  reply: FastifyReply
) {
  // Validate request params
  const { id } = request.params as { id: string };
  if (!id) {
    return reply.code(400).send({ error: "Product ID is required" });
  }
  // Validate request body
  const { value, error } = updateProductJoiSchema.validate(request.body);
  if (error) {
    return reply.code(400).send({ error: error.details[0].message });
  }
  try {
    await ProductModel.findByIdAndUpdate(id, value);
    return reply.code(200).send({
      message: "Product updated successfully",
    });
  } catch (err) {
    reply.code(500).send({ error: "Failed to update product" });
  }
}

export async function deleteProduct(
  request: FastifyRequest,
  reply: FastifyReply
) {
  // Validate request params
  const { id } = request.params as { id: string };
  if (!id) {
    return reply.code(400).send({ error: "Product ID is required" });
  }
  try {
    await ProductModel.findByIdAndDelete(id);
    return reply.code(200).send({ message: "Product deleted successfully" });
  } catch (err) {
    reply.code(500).send({ error: "Failed to delete product" });
  }
}
