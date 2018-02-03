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
  item$;
  quantity: number;
  
  constructor(private cartService: ShoppingCartService) {}

  async ngOnInit() {
    this.item$ = await this.cartService.getItem(this.product.$key);    
  }
  
  addToCart(product: IProduct) {
    console.log('add');
    this.cartService.addToCart(product);
  }

  removeFromCart(product: IProduct) {
    console.log('reduce');
    this.cartService.removeFromCart(product);
  }
}
