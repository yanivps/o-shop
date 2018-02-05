import { IShoppingCartItem, ShoppingCartItem } from "./shopping-cart-item";
import { Product } from "./product";

export class ShoppingCart {
  items: IShoppingCartItem[];

  constructor(private itemsMap: {[productId: string]: IShoppingCartItem}) {
    this.itemsMap = itemsMap || {};
    this.items = [];
    for (const productId in itemsMap) {
      let item: IShoppingCartItem = itemsMap[productId];
      this.items.push(new ShoppingCartItem({ ...item, $key: productId }));
    }
  }

  getItem(product: Product): ShoppingCartItem {
    return this.itemsMap[product.$key];
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

