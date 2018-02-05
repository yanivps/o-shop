export interface IShoppingCartItem {
  $key: string;
  title: string;
  price: number;
  imageUrl: string;
  quantity: number;
  readonly totalPrice: number;
}

export class ShoppingCartItem implements IShoppingCartItem {
  $key: string;
  title: string;
  price: number;
  imageUrl: string;
  quantity: number;

  constructor(item?: IShoppingCartItem) {
    Object.assign(this, item);
  }

  get totalPrice(): number {
    return this.quantity * this.price;
  }
}