import { IProduct } from "./product";

export interface IShoppingCartItem {
  product: IProduct;
  quantity: number;
}