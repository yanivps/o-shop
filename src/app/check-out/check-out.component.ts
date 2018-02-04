import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from '../services/shopping-cart.service';
import { ShoppingCart } from '../models/shopping-cart';
import { OrderService } from '../services/order.service';
import { Router } from '@angular/router';
import { IShoppingCartItem } from '../models/shopping-cart-item';
import { Order } from '../models/order';
import { IOrderItem } from '../models/order-item';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit {
  cart: ShoppingCart
  order: Order = new Order();
  subscription: Subscription;

  constructor(
    private router: Router,
    private cartService: ShoppingCartService,
    private orderService: OrderService) { 
  }

  async ngOnInit() {
    let cart$ = await this.cartService.getCart();    
    this.subscription = cart$.subscribe(cart => {
      this.cart = cart;
      this.order.items = this.cart.items;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  
  saveOrder() {
    this.orderService.create(this.order).subscribe((result) => {
      let orderId = result.key;
      this.cartService.clearCart();
      this.router.navigate(['/order-success', orderId])
    });
  }

}
