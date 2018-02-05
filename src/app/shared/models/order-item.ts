export interface IOrderItem {
  product: { title: string, price: number, imageUrl: string };
  quantity: number;
  totalPrice: number;
}