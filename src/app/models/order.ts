import { IOrderItem, OrderItem } from "./order-item";

export class Order {
  $key: string;
  name: string;
  readonly dateCreated: number;
  address1: string;
  address2: string;
  city: string;
  items: IOrderItem[];

  constructor(itemsMap?: { [productId: string]: IOrderItem }, order?: Order) {
    if (order)
      Object.assign(this, order);
    this.items = [];
    if (!itemsMap) return;
    for (const productId in itemsMap) {
      let item: IOrderItem = itemsMap[productId];
      this.items.push(new OrderItem({ ...item, $key: productId }));
    }
  }

  get totalPrice(): number {
    let totalPrice = 0;
    for (const item of this.items)
      totalPrice += item.totalPrice;
    return totalPrice;
  }
}