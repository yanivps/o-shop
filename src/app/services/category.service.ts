import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { IProductCategory } from '../models/product';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class CategoryService {
  private _baseUrl = "/productCategories/";

  constructor(private db: AngularFireDatabase) { }

  listCategories(): Observable<IProductCategory[]> {
    return this.db.list(this._baseUrl, {
      query: {
        orderByChild: 'name'
      }
    });
  }
}
