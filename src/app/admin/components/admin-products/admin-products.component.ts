import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataTableResource } from 'angular-4-data-table';
import { IProduct } from '../../../shared/models/product';
import { ProductService } from '../../../shared/services/product.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit, OnDestroy {
  products: IProduct[];
  items: IProduct[] = [];
  itemCount: number;
  itemResource: DataTableResource<IProduct>;
  searchString: string = '';
  productsListSubscription: Subscription;
  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.productsListSubscription = this.productService.list()
      .subscribe(products => {
        this.products = products;
        this.initializeTable(products);
      })
  }

  private initializeTable(products: IProduct[]) {
    this.itemCount = products.length;
    this.itemResource = new DataTableResource(products)
    this.itemResource.query({ limit: 10, offset: 0 }).then(items => this.items = items);
  }
  ngOnDestroy() {
    if (this.productsListSubscription) this.productsListSubscription.unsubscribe
  }

  filter() {
    let filteredItems = this.products.filter(
      item => item.title.toLowerCase().indexOf(this.searchString.toLowerCase()) != -1
    );
    this.initializeTable(filteredItems);
  }

  reloadItems(params) {
    if (this.itemResource) {
      this.itemResource.query(
        params,
        item => !this.searchString ? true : item.title.toLowerCase().indexOf(this.searchString.toLowerCase()) != -1
      ).then(items => this.items = items);
    }
  }
}
