import mongoose, { Schema } from "mongoose";
import { IUser } from "../utils/interfaces";

const userSchema: Schema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 6 },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
    required: true,
  },
  fullName: { type: String },
  phoneNumber: { type: String },
  imageUrl: { type: String },
  birthDate: { type: Date },
  addresses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Address",
    },
  ],
  orders: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
    },
  ],
  createdAt: { type: Date, default: Date.now() },
  updatedAt: { type: Date, default: Date.now() },
  isDeleted: { type: Boolean, default: false },
});

export const UserModel = mongoose.model<IUser>("User", userSchema);
