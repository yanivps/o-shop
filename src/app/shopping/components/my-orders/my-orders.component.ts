import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../../shared/services/order.service';
import { Observable } from 'rxjs/Observable';
import "rxjs/add/operator/switchMap";
import { Order } from '../../../shared/models/order';
import { AuthService } from '../../../shared/services/auth.service';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent {
  orders$: Observable<Order[]>

  constructor(
    authService: AuthService,
    orderService: OrderService
  ) {
    this.orders$ = authService.authUser$.switchMap(user => orderService.list(user.uid));
  }
}
