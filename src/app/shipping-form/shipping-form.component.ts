import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { OrderService } from '../shared/services/order.service';
import { Router } from '@angular/router';
import { Order } from '../shared/models/order';
import { ShoppingCart } from '../shared/models/shopping-cart';
import { AuthService } from '../shared/services/auth.service';
import { Subscription } from 'rxjs/Subscription';
import { Shipping } from '../shared/models/shipping';


@Component({
  selector: 'shipping-form',
  templateUrl: './shipping-form.component.html',
  styleUrls: ['./shipping-form.component.css']
})
export class ShippingFormComponent implements OnInit, OnDestroy {
  @Input('cart') cart: ShoppingCart;
  shipping: Shipping = new Shipping();
  userId: string;
  userSubscription: Subscription;

  constructor(
    private router: Router,
    private authService: AuthService,
    private orderService: OrderService
  ) { }

  ngOnInit() {
    this.userSubscription = this.authService.authUser$.subscribe(user => this.userId = user.uid);
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }

  async saveOrder() {
    let order = new Order(this.userId, this.shipping, this.cart);
    let result = await this.orderService.placeOrder(order);
    this.router.navigate(['/order-success', result.key]);
  }

}
