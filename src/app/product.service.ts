import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { IProduct, IProductCategory } from './models/product';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ProductService {
  private _baseUrl = "/products/";
  private _categoriesBaseUrl = "/productCategories/";

  constructor(private db: AngularFireDatabase) { }

  list(): Observable<IProduct[]> {
    return this.db.list(this._baseUrl);
  }

  get(productId): Observable<IProduct> {
    return this.db.object(this._baseUrl + productId);
  }

  create(product: IProduct) {
    this.db.list(this._baseUrl).push(product);
  }

  update(productId, product: IProduct) {
    this.db.object(this._baseUrl + productId).set(product);
  }

  delete(productId) {
    this.db.object(this._baseUrl + productId).remove();
  }

  listCategories(): Observable<IProductCategory[]> {
    return this.db.list(this._categoriesBaseUrl)
      .map((items: any[]) => {
        return items.map(item => ({ id: item.$key, name: item.$value } as IProductCategory));
      });
  }
}
