export interface IBrand {
  _id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface ICategory {
  _id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}
export interface IProduct {
  _id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  galleries: string[];
  quantity: number;
  brand_id: IBrand;
  category_id: ICategory;
  createdAt: string;
  updatedAt: string;
}

export interface IUser {
  _id: string;
  username: string;
  email: string;
  password?: string;
  phone?: string;
  role: 'user' | 'admin';
  createdAt: string;
  updatedAt: string;
}

export interface IComment {
  _id: string;
  content: string;
  product_id: string;
  user_id: IUser;
  createdAt: string;
  updatedAt: string;
}
