import { IShoppingCartItem, ShoppingCartItem } from "./shopping-cart-item";

export interface IShoppingCart {
  items: IShoppingCartItem[];
  readonly totalItemsCount: number;
  readonly totalPrice: number;
}

export class ShoppingCart implements IShoppingCart {
  items: IShoppingCartItem[];

  constructor(itemsMap: {[productId: string]: IShoppingCartItem}) {
    this.items = [];
    for (const productId in itemsMap) {
      let item: IShoppingCartItem = itemsMap[productId];
      this.items.push(new ShoppingCartItem({ ...item, $key: productId }));
    }
  }

  get totalPrice(): number {
    let totalPrice = 0;
    for (const item of this.items)
      totalPrice += item.totalPrice;
    return totalPrice;
  }
  
  get totalItemsCount(): number {
    let totalItemsCount = 0;
    for (const productId in this.items)
      totalItemsCount += this.items[productId].quantity;
    return totalItemsCount;
  }
}