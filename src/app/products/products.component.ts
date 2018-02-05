import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductService } from '../shared/services/product.service';
import { Observable } from 'rxjs/Observable';
import { IProduct } from '../shared/models/product';
import "rxjs/add/operator/switchMap";
import { ShoppingCartService } from '../shared/services/shopping-cart.service';
import { ShoppingCart } from '../shared/models/shopping-cart';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: IProduct[];
  filteredProducts: IProduct[];
  cart$: Observable<ShoppingCart>
  category;

  constructor(
    private productService: ProductService,
    private cartService: ShoppingCartService,
    private route: ActivatedRoute) {
  }

  async ngOnInit() {
    this.cart$ = await this.cartService.getCart();
    this.populateProducts();
  }

  populateProducts() {
    this.productService.list()
      .switchMap(products => {
        this.products = products;
        return this.route.queryParamMap;
      })
      .subscribe(queryParam => {
        this.category = queryParam.get("category");
        this.applyFilter();
      })
  }

  applyFilter() {
    this.filteredProducts = this.category ?
      this.products.filter(p => p.category == this.category) :
      this.products;
  }
}