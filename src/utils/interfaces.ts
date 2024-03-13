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
  _id: string;
  email: string;
  password: string;
  role: string;
  fullName: string;
  phoneNumber: string;
  imageUrl: string;
  birthDate: Date;
  addresses: IAddress[];
  orders: IOrder[];
  createdAt: Date;
  updatedAt: Date;
  isDeleted: boolean;
}

export interface IAddress extends Document {
  _id: string;
  userId: string;
  name: string;
  phone: string;
  address: string;
  province: string;
  district: string;
  subdistrict: string;
  zipCode: string;
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
  shippingAddress: IAddress;
  status: string;
  createdAt: Date;
  updatedAt: Date;
  isDeleted: boolean;
}
