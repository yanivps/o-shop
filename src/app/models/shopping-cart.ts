import { IShoppingCartItem } from "./shopping-cart-item";

export interface IShoppingCart {
  items: IShoppingCartItem[];
  totalItemsCount: number;
}

export class ShoppingCart implements IShoppingCart {
  items: IShoppingCartItem[];

  constructor(items: IShoppingCartItem[]) {
    this.items = items;
  }

  get totalItemsCount(): number {
    let totalItemsCount = 0;
    for (const productId in this.items)
      totalItemsCount += this.items[productId].quantity;
    return totalItemsCount;
  }
}