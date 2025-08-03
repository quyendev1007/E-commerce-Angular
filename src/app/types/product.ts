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
  quantity: number;
  brand_id: IBrand;
  category_id: ICategory;
  createdAt: string;
  updatedAt: string;
}
