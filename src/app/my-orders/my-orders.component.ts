import { Component, OnInit } from '@angular/core';
import { OrderService } from '../services/order.service';
import { Observable } from 'rxjs/Observable';
import { Order } from '../models/order';
import { AuthService } from '../services/auth.service';

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
    authService.authUser$.subscribe(user => {
      this.orders$ = orderService.list(user.uid);      
    });
  }
}
