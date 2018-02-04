import { Component, OnInit, OnDestroy } from '@angular/core';
import { ShoppingCartService } from '../services/shopping-cart.service';
import { Observable } from 'rxjs/Observable';
import { ShoppingCart } from '../models/shopping-cart';
import { IProduct, Product } from '../models/product';
import { Subscription } from 'rxjs/Subscription';
import { IShoppingCartItem } from '../models/shopping-cart-item';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit, OnDestroy {
  cart: ShoppingCart
  totalPrice: number;
  subscription: Subscription;

  constructor(private cartService: ShoppingCartService) { 
  }

  async ngOnInit() {
    let cart$ = await this.cartService.getCart();
    this.subscription = cart$.subscribe(cart => {
      this.cart = cart;
      this.totalPrice = cart.items.map(item => item.totalPrice)
        .reduce((sum, val) => sum + val, 0);
    })
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  addToCart(item: IShoppingCartItem) {
    this.cartService.addToCart(item);
  }

  removeOneFromCart(item: IShoppingCartItem) {
    this.cartService.removeOneFromCart(item);
  }

  clearCart() {
    this.cartService.clearCart();
  }

}
