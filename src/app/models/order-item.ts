import { IItem, Item } from "./item";

export interface IOrderItem extends IItem {
}

export class OrderItem extends Item {
  constructor(item?: IOrderItem) {
    super(item);
  }
}