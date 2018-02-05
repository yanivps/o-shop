import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Order } from '../models/order';
import { Observable } from 'rxjs/Observable';
import "rxjs/add/observable/fromPromise";
import { AuthService } from './auth.service';
import { IOrderItem } from '../models/order-item';
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
    return this.db.object(this._baseUrl + orderId)
      .map(order => new Order(order.items, order));
  }

  create(order: Order) {
    let datetime = new Date().getTime();
    let itemsMap = this.getItemsMapFromOrder(order);
    let { items, ...orderObj } = order;
    
    return this.authService.authUser$
      .switchMap(user => {
        this.cartService.clearCart();
        return Observable.fromPromise(
          this.db.list(this._baseUrl).push({
            dateCreated: datetime, 
            userId: user.uid, 
            items: itemsMap,
            ...orderObj
          })
        );
      });
  }
  
  private getItemsMapFromOrder(order: Order) {
    let itemsMap = {};
    for (const orderItem of order.items) {
      let { $key, ...item } = orderItem;
      itemsMap[orderItem.$key] = item
    }
    return itemsMap;
  }
}
