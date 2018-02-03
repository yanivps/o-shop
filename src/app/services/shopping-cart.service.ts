import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';
import { IProduct } from '../models/product';
import "rxjs/add/operator/take";
import { IShoppingCartItem } from '../models/shopping-cart-item';

@Injectable()
export class ShoppingCartService {
  private _baseUrl: string = "/shopping-carts/"

  constructor(private db: AngularFireDatabase) { }

  private getCart(cartId) {
    return this.db.object(this._baseUrl + cartId);
  }

  async getItem(productId): Promise<FirebaseObjectObservable<IShoppingCartItem>> {
    let cartId = await this.getOrCreateCartId();
    return this.db.object(this._baseUrl + cartId + "/items/" + productId);
  }

  private getProductQuantity(productId) {
    
  }

  private create() {
    return this.db.list(this._baseUrl).push({
      dateCreated: new Date().getTime()
    });
  }

  private async getOrCreateCartId() {
    let cartId = localStorage.getItem('cartId');
    if (cartId) return cartId;

    let result = await this.create();
    localStorage.setItem('cartId', result.key);
    return result.key;
  }

  addToCart(product: IProduct) {
    return this.addToOrRemoveFromCart(product, 1);
  }
  removeFromCart(product: IProduct) {
    return this.addToOrRemoveFromCart(product, -1);
  }
  
  async addToOrRemoveFromCart(product: IProduct, numOfItem) {
    let item$ = await this.getItem(product.$key);
    item$.take(1).subscribe(item => {
      if ((item.quantity || 0) + numOfItem < 0) return;
      item$.update({ product: product, quantity: (item.quantity || 0) + numOfItem })
    });
  }
}
