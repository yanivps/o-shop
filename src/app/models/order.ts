import { IOrderItem } from "./order-item";
import { ShoppingCart } from "./shopping-cart";
import { Shipping } from "./shipping";

export class Order {
  $key: string;
  readonly dateCreated: number;
  items: IOrderItem[];

  constructor(
    public userId: string,
    public shipping: Shipping,
    cart: ShoppingCart) {
    this.dateCreated = new Date().getTime();

    this.items = cart.items.map(i => {
      return {
        product: {
          title: i.title,
          price: i.price,
          imageUrl: i.imageUrl
        },
        quantity: i.quantity,
        totalPrice: i.totalPrice
      };
    });
  }
}