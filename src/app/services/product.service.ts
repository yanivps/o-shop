import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { IProduct } from '../models/product';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ProductService {
  private _baseUrl = "/products/";

  constructor(private db: AngularFireDatabase) { }

  list(): Observable<IProduct[]> {
    return this.db.list(this._baseUrl);
  }

  get(productId): Observable<IProduct> {
    return this.db.object(this._baseUrl + productId);
  }

  create(product: IProduct) {
    return this.db.list(this._baseUrl).push(product);
  }

  update(productId, product: IProduct) {
    return this.db.object(this._baseUrl + productId).set(product);
  }

  delete(productId) {
    return this.db.object(this._baseUrl + productId).remove();
  }
}
