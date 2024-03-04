import { Document } from "mongoose";

export interface IProduct extends Document {
  _id: string;
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
  _id: string;
  email: string;
  password: string;
  role: string;
  createdAt: Date;
  updatedAt: Date;
  isDeleted: boolean;
}

export interface ICategory extends Document {
  _id: string;
  name: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
  isDeleted: boolean;
}

export interface IOrder extends Document {
  _id: string;
  userId: string;
  products: {
    productId: string;
    quantity: number;
    price: number;
  }[];
  total_price: number;
  status: string;
  createdAt: Date;
  updatedAt: Date;
  isDeleted: boolean;
}
