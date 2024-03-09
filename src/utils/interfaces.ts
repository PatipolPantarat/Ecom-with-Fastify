import { Document } from "mongoose";

export interface IProduct extends Document {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  stock: number;
  sold: number;
  image: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
  isDeleted: boolean;
}

export interface IUser extends Document {
  userProfile: {
    email: string;
    password: string;
    role: string;
    fullName?: string;
    phoneNumber?: string;
    imageUrl?: string;
    birthDate?: Date;
  };
  userAddresses?: {
    address: string;
    province: string;
    district: string;
    subdistrict: string;
    zipCode: string;
  }[];
  userFavorites?: string[];
  userCarts?: {
    productId: string;
    quantity: number;
  }[];
  userOrders?: string[];
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
