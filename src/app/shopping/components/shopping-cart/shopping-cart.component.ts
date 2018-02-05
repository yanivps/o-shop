import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from '../../../shared/services/shopping-cart.service';
import { Observable } from 'rxjs/Observable';
import { ShoppingCart } from '../../../shared/models/shopping-cart';
import { IShoppingCartItem } from '../../../shared/models/shopping-cart-item';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  cart$: Observable<ShoppingCart>

  constructor(private cartService: ShoppingCartService) { 
  }

  async ngOnInit() {
    this.cart$ = await this.cartService.getCart();
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
