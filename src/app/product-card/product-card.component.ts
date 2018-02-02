import { Component, OnInit, Input } from '@angular/core';
import { Product, IProduct } from '../models/product';
import { ShoppingCartService } from '../services/shopping-cart.service';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {
  @Input('product') product: Product = new Product();
  @Input('show-actions') showActions: boolean = true;
  
  constructor(private cartService: ShoppingCartService) { }

  addToCart(product: IProduct) {
    this.cartService.addToCart(product);
  }
}
