import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';
import { IProduct } from '../models/product';
import "rxjs/add/operator/take";
import { IShoppingCartItem } from '../models/shopping-cart-item';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ShoppingCartService {
  private _baseUrl: string = "/shopping-carts/"

  constructor(private db: AngularFireDatabase) { }

  async getItem(productId): Promise<FirebaseObjectObservable<IShoppingCartItem>> {
    let cartId = await this.getOrCreateCartId();
    return this.db.object(this._baseUrl + cartId + "/items/" + productId);
  }
  
  addToCart(product: IProduct) {
    return this.updateItemQuantity(product, 1);
  }

  removeOneFromCart(product: IProduct) {
    return this.updateItemQuantity(product, -1);
  }

  async removeFromCart(product: IProduct) {
    let items$ = await this.getItems();
    items$.remove();
  }

  async clearCart() {
    let cartId = await this.getOrCreateCartId();
    return this.db.object(this._baseUrl + cartId + "/items/").remove()
  }

  private async getItems(): Promise<FirebaseObjectObservable<IShoppingCartItem[]>> {
    let cartId = await this.getOrCreateCartId();
    return this.db.object(this._baseUrl + cartId + "/items/");
  }

  async listItems(): Promise<Observable<IShoppingCartItem[]>> {
    let cartId = await this.getOrCreateCartId();
    return this.db.list(this._baseUrl + cartId + "/items/");
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
  
  private async updateItemQuantity(product: IProduct, change: number) {
    let item$ = await this.getItem(product.$key);
    item$.take(1).subscribe(item => {
      let newQuantity = (item.quantity || 0) + change
      if (newQuantity == 0) {
        item$.remove();
        return;
      }
      item$.update({ product: product, quantity: (item.quantity || 0) + change })
    });
  }
}
