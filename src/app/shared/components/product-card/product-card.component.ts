import { Component, Input } from '@angular/core';
import { ShoppingCart } from 'shared/models/shopping-cart';

import { Product } from '../../models/product';
import { ShoppingCartService } from '../../services/shopping-cart.service';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {
  @Input('product') product: Product = new Product();
  @Input('show-actions') showActions: boolean = true;
  @Input('cart') cart: ShoppingCart;
  
  constructor(private cartService: ShoppingCartService) {}

  get item() {
    return this.cart.getItem(this.product);
  }
  
  addToCart() {
    this.cartService.addToCart(this.product);
  }

  removeOneFromCart() {
    this.cartService.removeOneFromCart(this.product);
  }
}
