import mongoose, { Schema } from "mongoose";
import { IUser } from "../utils/interfaces";

const userSchema: Schema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  role: { enum: ["admin", "user"], required: true, default: "user" },
  createdAt: { type: Date, default: Date.now() },
  updatedAt: { type: Date, default: Date.now() },
  isDeleted: { type: Boolean, default: false },
});

export const UserModel = mongoose.model<IUser>("User", userSchema);
