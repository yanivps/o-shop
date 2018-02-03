import { Component, OnInit, OnDestroy } from '@angular/core';
import { ShoppingCartService } from '../services/shopping-cart.service';
import { IShoppingCartItem } from '../models/shopping-cart-item';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'shopping-cart-counter',
  template: `
    <span 
      *ngIf="cartItemsCount >= 0"
      class="badge badge-pill badge-warning">{{ cartItemsCount }}</span>`,
  styleUrls: ['./shopping-cart-counter.component.css']
})
export class ShoppingCartCounterComponent implements OnInit, OnDestroy {
  subscription: Subscription
  cartItemsCount: number;

  constructor(private cartService: ShoppingCartService) { 
  }

  async ngOnInit() {
    let items$ = await this.cartService.listItems();
    this.subscription = items$
      .map(cartItems => cartItems.map(cartItem => cartItem.quantity))
      .subscribe(quantities => {
        this.cartItemsCount = quantities.reduce((sum, val) => sum + val, 0)
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
