import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Order } from '../models/order';
import { Observable } from 'rxjs/Observable';
import "rxjs/add/observable/fromPromise";
import { AuthService } from './auth.service';
import { ShoppingCartService } from './shopping-cart.service';

@Injectable()
export class OrderService {
  private _baseUrl: string = "/orders/"
  constructor(
    private authService: AuthService,
    private cartService: ShoppingCartService,
    private db: AngularFireDatabase) { }

  list(userId?: string): Observable<Order[]> {
    if (!userId) return this.db.list(this._baseUrl);

    return this.db.list(this._baseUrl, {
      query: {
        orderByChild: "userId",
        equalTo: userId
      }
    })
  }

  get(orderId: string): Observable<Order> {
    return this.db.object(this._baseUrl + orderId);
  }

  async placeOrder(order: Order) {
    let result = await this.db.list(this._baseUrl).push(order);
    this.cartService.clearCart();
    return result;
  }
}
