export interface IProduct {
  title: string;
  price: number;
  category: string;
  imageUrl: string;
}

export interface IProductCategory {
  name: string;
}

export class Product implements IProduct {
  title: string;
  price: number;
  category: string;
  imageUrl: string;
}