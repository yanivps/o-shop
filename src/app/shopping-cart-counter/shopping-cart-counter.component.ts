import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from '../shared/services/shopping-cart.service';
import { IShoppingCartItem } from '../shared/models/shopping-cart-item';
import { Observable } from 'rxjs/Observable';
import { ShoppingCart, IShoppingCart } from '../shared/models/shopping-cart';

@Component({
  selector: 'shopping-cart-counter',
  template: `
    <span 
      *ngIf="cart$ | async as cart"
      class="badge badge-pill badge-warning">{{ cart.totalItemsCount }}</span>`,
  styleUrls: ['./shopping-cart-counter.component.css']
})
export class ShoppingCartCounterComponent implements OnInit {
  cart$: Observable<ShoppingCart>;

  constructor(private cartService: ShoppingCartService) { 
  }

  async ngOnInit() {
    this.cart$ = await this.cartService.getCart();
  }
}
