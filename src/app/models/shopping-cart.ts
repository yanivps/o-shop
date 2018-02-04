import { IShoppingCartItem, ShoppingCartItem } from "./shopping-cart-item";

export interface IShoppingCart {
  items: IShoppingCartItem[];
  readonly totalItemsCount: number;
}

export class ShoppingCart implements IShoppingCart {
  items: IShoppingCartItem[];

  constructor(items: {productId: string, item: IShoppingCartItem}) {
    this.items = [];
    for (const productId in items) {
      let item: IShoppingCartItem = items[productId];
      this.items.push(new ShoppingCartItem({ ...item, $key: productId }));
    }
  }

  get totalItemsCount(): number {
    let totalItemsCount = 0;
    for (const productId in this.items)
      totalItemsCount += this.items[productId].quantity;
    return totalItemsCount;
  }
}