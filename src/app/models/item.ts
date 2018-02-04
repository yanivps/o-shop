export interface IItem {
  $key: string;
  title: string;
  price: number;
  imageUrl: string;
  quantity: number;
  readonly totalPrice: number;
}

export class Item {
  $key: string;
  title: string;
  price: number;
  imageUrl: string;
  quantity: number;

  constructor(item?: Item) {
    Object.assign(this, item);
  }

  get totalPrice(): number {
    return this.quantity * this.price;
  }
}