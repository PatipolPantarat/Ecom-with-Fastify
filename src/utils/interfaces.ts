import { Document } from "mongoose";

export interface IProduct extends Document {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  stock: number;
  image: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
  isDeleted: boolean;
}

export interface IUser extends Document {
  id: string;
  email: string;
  password: string;
  role: string;
  createdAt: Date;
  updatedAt: Date;
  isDeleted: boolean;
}

export interface ICategory extends Document {
  id: string;
  name: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
  isDeleted: boolean;
}
