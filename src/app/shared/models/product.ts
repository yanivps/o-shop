export interface IProduct {
  $key: string;
  title: string;
  price: number;
  category: string;
  imageUrl: string;
}

export interface IProductCategory {
  name: string;
}

export class Product implements IProduct {
  $key: string;
  title: string;
  price: number;
  category: string;
  imageUrl: string;
}