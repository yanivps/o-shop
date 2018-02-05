import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';
import { IProduct } from '../models/product';
import "rxjs/add/operator/take";
import "rxjs/add/operator/map";
import { IShoppingCartItem } from '../models/shopping-cart-item';
import { Observable } from 'rxjs/Observable';
import { ShoppingCart } from '../models/shopping-cart';
import { Thenable } from 'firebase/app';

@Injectable()
export class ShoppingCartService {
  private _baseUrl: string = "/shopping-carts/"
  private createPromise: Thenable<any>

  constructor(private db: AngularFireDatabase) { }

  async getCart(): Promise<Observable<ShoppingCart>> {
    let cartId = await this.getOrCreateCartId();
    return this.db.object(this._baseUrl + cartId)
      .map(cart => new ShoppingCart(cart.items));
  }
  
  addToCart(product: IProduct | IShoppingCartItem) {
    return this.updateItem(product, 1);
  }

  removeOneFromCart(product: IProduct | IShoppingCartItem) {
    return this.updateItem(product, -1);
  }

  async removeFromCart(product: IProduct) {
    let cartId = await this.getOrCreateCartId();
    let items$ = this.getItems(cartId);
    items$.remove();
  }

  async clearCart() {
    let cartId = await this.getOrCreateCartId();
    return this.db.object(this._baseUrl + cartId + "/items/").remove()
  }

  private getItem(cartId: string, productId: string) {
    return this.db.object(this._baseUrl + cartId + "/items/" + productId);
  }

  private getItems(cartId: string) {
    return this.db.object(this._baseUrl + cartId + "/items/");
  }

  private create() {
    return this.db.list(this._baseUrl).push({
      dateCreated: new Date().getTime()
    });
  }
  
  private getOrCreateCartId() {
    let cartId = localStorage.getItem('cartId');
    if (cartId) return Promise.resolve(cartId);

    if (this.createPromise) return this.createPromise.then(result => result.key);

    this.createPromise = this.create();
    this.createPromise.then(result => {
      localStorage.setItem('cartId', result.key);
    })
    return this.createPromise.then(result => result.key);
  }
  
  private async updateItem(product: IProduct | IShoppingCartItem, change: number) {
    if (!product.$key) throw "Can not update quantity of product without id";
    let cartId = await this.getOrCreateCartId();
    let item$ = this.getItem(cartId, product.$key);
    item$.take(1).subscribe(item => {
      let newQuantity = (item.quantity || 0) + change
      if (newQuantity <= 0) item$.remove();
      else item$.update({
          title: product.title,
          price: product.price,
          imageUrl: product.imageUrl,
          quantity: (item.quantity || 0) + change })
    });
  }
}
