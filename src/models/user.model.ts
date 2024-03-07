import mongoose, { Schema } from "mongoose";
import { IUser } from "../utils/interfaces";

// const userSchema: Schema = new mongoose.Schema({
//   email: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
//   role: {
//     type: String,
//     enum: ["admin", "user"],
//     default: "user",
//     required: true,
//   },
//   fullName: { type: String, required: true },
//   phoneNumber: { type: String, required: true },
//   address: {},
//   createdAt: { type: Date, default: Date.now() },
//   updatedAt: { type: Date, default: Date.now() },
//   isDeleted: { type: Boolean, default: false },
// });
const userSchema: Schema = new mongoose.Schema({
  userProfile: {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
      required: true,
    },
    fullName: { type: String },
    phoneNumber: { type: String },
    imageUrl: { type: String },
    birthDate: { type: Date },
  },
  userAddresses: [
    {
      address: { type: String },
      province: { type: String },
      district: { type: String },
      subdistrict: { type: String },
      zipCode: { type: String },
    },
  ],
  userFavorites: [
    {
      // type: mongoose.Schema.Types.ObjectId,
      type: String,
      ref: "Product",
    },
  ],
  userCarts: [
    {
      productId: {
        // type: mongoose.Schema.Types.ObjectId,
        type: String,
        ref: "Product",
      },
      quantity: { type: Number },
    },
  ],
  userOrders: [
    {
      // type: mongoose.Schema.Types.ObjectId,
      type: String,
      ref: "Order",
    },
  ],
  createdAt: { type: Date, default: Date.now() },
  updatedAt: { type: Date, default: Date.now() },
  isDeleted: { type: Boolean, default: false },
});

export const UserModel = mongoose.model<IUser>("User", userSchema);
