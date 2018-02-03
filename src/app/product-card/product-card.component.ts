import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Product, IProduct } from '../models/product';
import { ShoppingCartService } from '../services/shopping-cart.service';
import "rxjs/add/operator/take";
import { IShoppingCartItem } from '../models/shopping-cart-item';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {
  @Input('product') product: Product = new Product();
  @Input('show-actions') showActions: boolean = true;
  cartItem$;
  
  constructor(private cartService: ShoppingCartService) {}

  async ngOnInit() {
    this.cartItem$ = await this.cartService.getItem(this.product.$key);
  }
  
  addToCart() {
    this.cartService.addToCart(this.product);
  }

  removeOneFromCart() {
    this.cartService.removeOneFromCart(this.product);
  }
}
