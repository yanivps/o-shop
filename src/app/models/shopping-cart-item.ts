import { Item, IItem } from "./item";

export interface IShoppingCartItem extends IItem {
}

export class ShoppingCartItem extends Item implements IShoppingCartItem {
  
  constructor(item?: IShoppingCartItem) {
    super(item);
  }

  get totalPrice(): number {
    return this.quantity * this.price;
  }
}