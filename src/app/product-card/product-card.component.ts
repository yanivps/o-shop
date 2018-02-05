import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Product, IProduct } from '../models/product';
import { ShoppingCartService } from '../services/shopping-cart.service';
import "rxjs/add/operator/take";
import { Observable } from 'rxjs/Observable';
import { IShoppingCart } from '../models/shopping-cart';
import { IShoppingCartItem } from '../models/shopping-cart-item';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {
  @Input('product') product: Product = new Product();
  @Input('show-actions') showActions: boolean = true;
  @Input('cart') cart: IShoppingCart;
  
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
