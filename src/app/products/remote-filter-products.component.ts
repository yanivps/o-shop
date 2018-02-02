import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
import { Observable } from 'rxjs/Observable';
import { IProduct } from '../models/product';

@Component({
  selector: 'app-remote-filter-products',
  templateUrl: './remote-filter-products.component.html',
  styleUrls: ['./products.component.css']
})
export class RemoteFilterProductsComponent implements OnInit {
  products$;
  category;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.queryParamMap
      .subscribe(queryParam => {
        this.category = queryParam.get("category");
        this.products$ = this.category ?
          this.productService.query({ key: 'category', value: this.category }) :
          this.productService.list();
      })
  }
}