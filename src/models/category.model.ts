import mongoose, { Schema } from "mongoose";
import { ICategory } from "../utils/interfaces";

const categorySchema: Schema = new mongoose.Schema({
  name: { type: String, required: true },
  status: { enum: ["active", "inactive"], required: true, default: "active" },
  createdAt: { type: Date, default: Date.now() },
  updatedAt: { type: Date, default: Date.now() },
  isDeleted: { type: Boolean, default: false },
});

export const CategoryModel = mongoose.model<ICategory>(
  "Category",
  categorySchema
);
