import mongoose, { Schema } from "mongoose";
import { IProduct } from "../utils/interfaces";

const productSchema: Schema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: {
    // type: mongoose.Schema.Types.ObjectId,
    type: String,
    ref: "Category",
    required: true,
  },
  stock: { type: Number, required: true },
  image: { type: String, required: true },
  status: {
    type: String,
    enum: ["active", "inactive"],
    default: "active",
    required: true,
  },
  createdAt: { type: Date, default: Date.now() },
  updatedAt: { type: Date, default: Date.now() },
  isDeleted: { type: Boolean, default: false },
});

export const ProductModel = mongoose.model<IProduct>("Product", productSchema);
