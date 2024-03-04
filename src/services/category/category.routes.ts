import { FastifyInstance } from "fastify";
import {
  getCategoriesSchema,
  getCategorySchema,
  createCategorySchema,
  updateCategorySchema,
  deleteCategorySchema,
} from "./category.schema";
import {
  getCategoriesController,
  getCategoryController,
  createCategoryController,
  updateCategoryController,
  deleteCategoryController,
} from "./category.controller";

async function routes(fastify: FastifyInstance) {
  // GET /categories - List all categories
  fastify.get("/", getCategoriesSchema, getCategoriesController);

  // GET /categories/:id - Get a single category
  fastify.get("/:id", getCategorySchema, getCategoryController);

  // POST /categories - Create a new category
  fastify.post("/", createCategorySchema, createCategoryController);

  // PATCH /categories/:id - Update a category
  fastify.patch("/:id", updateCategorySchema, updateCategoryController);

  // DELETE /categories/:id - Delete a category
  fastify.delete("/:id", deleteCategorySchema, deleteCategoryController);
}

export default routes;
