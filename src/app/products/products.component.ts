import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { CategoryService } from '../services/category.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
import { Observable } from 'rxjs/Observable';
import { IProduct } from '../models/product';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  categories$;
  products$;
  selectedCategoryId;

  constructor(
    private authService: AuthService,
    private categoryService: CategoryService,
    private productService: ProductService,
    private route: ActivatedRoute) {
    this.categories$ = categoryService.listCategories();
  }

  ngOnInit() {
    this.route.queryParamMap
      .subscribe(queryParam => {
        this.selectedCategoryId = queryParam.get("category");
        this.products$ = this.selectedCategoryId ?
          this.productService.query({ key: 'category', value: this.selectedCategoryId }) :
          this.productService.list();
      })
  }
}