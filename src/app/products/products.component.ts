import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
import { Observable } from 'rxjs/Observable';
import { IProduct } from '../models/product';
import "rxjs/add/operator/switchMap";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: IProduct[];
  filteredProducts: IProduct[];
  category;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute) {
  }

  ngOnInit() {
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