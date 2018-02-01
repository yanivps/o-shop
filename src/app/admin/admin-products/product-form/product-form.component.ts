import { Component, OnInit } from '@angular/core';
import { NgModel } from '@angular/forms';
import "rxjs/add/operator/debounceTime";
import "rxjs/add/observable/combineLatest";
import { Subscription } from 'rxjs/Subscription';
import { IProduct, Product, IProductCategory } from '../../../models/product';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../../product.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  imageUrl: string = '';
  product: Product = new Product();
  currentProductId: string;
  categories: IProductCategory[];
  isLoading: boolean;
  private _imageUrlChangeSubscription: Subscription;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _productService: ProductService) {
      this.currentProductId = this._route.snapshot.paramMap.get('id');
    }

  ngOnInit() {
    if (!this.currentProductId) {
      this._productService.listCategories()
        .subscribe(categories => this.categories = categories);
      return;      
    }
    
    this.isLoading = true;
    Observable.combineLatest(
      this._productService.get(this.currentProductId),
      this._productService.listCategories()
    ).subscribe(combined => {
      let product = combined[0];
      let categories = combined[1];

      this.imageUrl = product.imageUrl;
      this.product = product;

      this.categories = categories;

      this.isLoading = false;
    });
  }

  imageUrlChanged(imageUrl: NgModel) {
    if (this._imageUrlChangeSubscription)
      return;
    
    this.imageUrl = imageUrl.value;
    this._imageUrlChangeSubscription = imageUrl.valueChanges
      .debounceTime(500)
      .subscribe(value => this.imageUrl = value);
  }

  deleteProduct() {
    this._productService.delete(this.currentProductId);
    this._router.navigate(['/admin/products'])
  }

  saveProduct() {
    if (this.currentProductId) {
      this._productService.update(this.currentProductId, this.product);
    } else {
      this._productService.create(this.product);
    }
    this._router.navigate(['/admin/products']);
  }

}
