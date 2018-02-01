export interface IProduct {
  title: string;
  price: number;
  imageUrl: string;
  categoryId: number
}

export interface IProductCategory {
  id: string;
  name: string;
}

export class Product implements IProduct {
  title: string;
  price: number;
  imageUrl: string;
  categoryId: number
}