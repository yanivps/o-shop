import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgModel } from '@angular/forms';
import "rxjs/add/operator/debounceTime";
import "rxjs/add/observable/combineLatest";
import { Subscription } from 'rxjs/Subscription';
import { IProduct, Product, IProductCategory } from '../../../shared/models/product';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../../shared/services/product.service';
import { Observable } from 'rxjs/Observable';
import { CategoryService } from '../../../shared/services/category.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit, OnDestroy {
  cardImageUrl: string;
  product: Product = new Product();
  productId: string;
  categories: IProductCategory[];
  isLoading: boolean;
  private _imageUrlChangeSubscription: Subscription;
  private _categoriesSubscription: Subscription;
  private _productsAndCategoriesSubscription: Subscription;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _productService: ProductService,
    private _categoryService: CategoryService) {
      this.productId = this._route.snapshot.paramMap.get('id');
    }

  ngOnInit() {
    // New product
    if (!this.productId) {
      this._categoriesSubscription = this._categoryService.list()
        .subscribe(categories => this.categories = categories);
      return;
    }
    
    // Edit product
    this.isLoading = true;
    this._productsAndCategoriesSubscription = Observable.combineLatest(
      this._productService.get(this.productId),
      this._categoryService.list()
    ).subscribe(combined => {
      let product = combined[0];
      let categories = combined[1];

      this.cardImageUrl = product.imageUrl;
      this.product = product;
      this.categories = categories;
      this.isLoading = false;
    });
  }

  ngOnDestroy() {
    if (this._imageUrlChangeSubscription) this._imageUrlChangeSubscription.unsubscribe();
    if (this._categoriesSubscription) this._categoriesSubscription.unsubscribe();
    if (this._productsAndCategoriesSubscription) this._productsAndCategoriesSubscription.unsubscribe();
  }

  imageUrlChanged(imageUrl: NgModel) {
    if (this._imageUrlChangeSubscription || imageUrl.invalid) return;

    this.product.imageUrl = imageUrl.value;
    this._imageUrlChangeSubscription = imageUrl.valueChanges
      .debounceTime(500)
      .subscribe(value => imageUrl.valid ? this.product.imageUrl = value : this.product.imageUrl = '');
  }

  deleteProduct() {
    if (!confirm("Are you sure you want to delete " + this.product.title)) return;
    
    this._productService.delete(this.productId);
    this._router.navigate(['/admin/products'])
  }

  saveProduct() {
    this.product.imageUrl = this.cardImageUrl;
    if (this.productId) {
      this._productService.update(this.productId, this.product);
    } else {
      this._productService.create(this.product);
    }
    this._router.navigate(['/admin/products']);
  }

}
