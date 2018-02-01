import { Component, OnInit } from '@angular/core';
import { DataTableResource } from 'angular-4-data-table';
import { IProduct } from '../../models/product';
import { ProductService } from '../../product.service';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit {
  products: IProduct[];
  items: IProduct[] = [];
  itemCount = 0;
  itemResource: DataTableResource<IProduct>;
  searchString: string = '';
  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.productService.list()
      .subscribe(products => {
        this.products = products;
        this.itemCount = products.length;
        this.itemResource = new DataTableResource(products)
        this.itemResource.query({ limit: 10, offset: 0 }).then(items => this.items = items);
      })
  }

  filter(params) {
    if (this.searchString == null)
      return;

    this.items = this.products.filter(
      item => item.title.toLowerCase().indexOf(this.searchString.toLowerCase()) != -1
    );
    this.itemCount = this.items.length;
    this.reloadItems(params);
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
