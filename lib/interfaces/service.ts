import { User } from "./user";

interface Category {
  _id: string;
  name: string;
}

export interface Service {
  _id: string;
  provider: User;
  title: string;
  description: string;
  price: number;
  coverImage: string;
  images: string[];
  sold: number;
  category: Category;
  isActive: boolean;
  ratingsQuantity: number;
  location: string;
  createdAt: string;
  updatedAt: string;
  ratingsAverage: number;
  id: string;
}
