import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { IProduct } from '../models/product';
import "rxjs/add/operator/take";

@Injectable()
export class ShoppingCartService {
  private _baseUrl: string = "/shopping-carts/"

  constructor(private db: AngularFireDatabase) { }

  private get(cartId) {
    return this.db.object(this._baseUrl + cartId);
  }

  private create() {
    return this.db.list(this._baseUrl).push({
      dateCreated: new Date().getTime()
    });
  }

  private async getOrCreate() {
    let cartId = localStorage.getItem('cartId');
    if (cartId) return cartId;

    let result = await this.create();
    localStorage.setItem('cartId', result.key);
    return result.key;
  }

  private getItem(cartId, itemId) {
    return this.db.object(this._baseUrl + cartId + "/items/" + itemId);
  }

  async addToCart(product: IProduct) {
    let cartId = await this.getOrCreate();    
    let item$ = this.getItem(cartId, product.$key);
    item$.take(1).subscribe(item => {
      item$.update({ product: product, quantity: (item.quantity || 0) + 1 })
    });
  }
}
