import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Order } from '../../models/order';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent {
  order$: Observable<Order>
  
  constructor(
    route: ActivatedRoute,
    orderService: OrderService
  ) { 
    let orderId = route.snapshot.paramMap.get('id');
    this.order$ = orderService.get(orderId);
  }
}
