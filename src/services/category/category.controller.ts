import { FastifyRequest, FastifyReply } from "fastify";
import { CategoryModel } from "../../models/category.model";
import { ICategory } from "../../utils/interfaces";

export async function getCategoriesController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const categories = await CategoryModel.find();
    return reply.code(200).send(categories);
  } catch (err) {
    reply.code(500).send({ error: "Failed to fetch categories", err });
  }
}

export async function getCategoryController(
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) {
  try {
    const category = await CategoryModel.findById(request.params.id);
    return reply.code(200).send(category);
  } catch (err) {
    reply.code(500).send({ error: "Failed to fetch category", err });
  }
}

export async function createCategoryController(
  request: FastifyRequest<{ Body: ICategory }>,
  reply: FastifyReply
) {
  try {
    const newCategory = new CategoryModel(request.body);
    await CategoryModel.create(newCategory);
    return reply.code(201).send(newCategory);
  } catch (err) {
    reply.code(500).send({ error: "Failed to create category", err });
  }
}

export async function updateCategoryController(
  request: FastifyRequest<{ Params: { id: string }; Body: ICategory }>,
  reply: FastifyReply
) {
  try {
    await CategoryModel.findByIdAndUpdate(request.params.id, request.body);
    return reply.code(200).send({ message: "Category updated successfully" });
  } catch (err) {
    reply.code(500).send({ error: "Failed to update category", err });
  }
}

export async function deleteCategoryController(
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) {
  try {
    await CategoryModel.findByIdAndDelete(request.params.id);
    return reply.code(200).send({ message: "Category deleted successfully" });
  } catch (err) {
    reply.code(500).send({ error: "Failed to delete category", err });
  }
}
