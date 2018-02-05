import { Component, OnInit, Input } from '@angular/core';
import { OrderService } from '../services/order.service';
import { Router } from '@angular/router';
import { Order } from '../models/order';
import { ShoppingCart } from '../models/shopping-cart';


@Component({
  selector: 'shipping-form',
  templateUrl: './shipping-form.component.html',
  styleUrls: ['./shipping-form.component.css']
})
export class ShippingFormComponent {
  @Input('cart') cart: ShoppingCart;
  order: Order = new Order();

  constructor(
    private router: Router,
    private orderService: OrderService
  ) { }

  saveOrder() {
    this.order.items = this.cart.items;
    this.orderService.create(this.order).subscribe((result) => {
      let orderId = result.key;
      this.router.navigate(['/order-success', orderId])
    });
  }

}
