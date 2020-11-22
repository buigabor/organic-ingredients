import { Subscription } from 'rxjs';
import { OrderService } from './../../services/order-service/order.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-view-order',
  templateUrl: './admin-view-order.component.html',
  styleUrls: ['./admin-view-order.component.scss'],
})
export class AdminViewOrderComponent implements OnInit {
  orderId: string;
  orderSubscription: Subscription;
  order;

  constructor(
    private route: ActivatedRoute,
    private orderService: OrderService
  ) {
    this.orderId = this.route.snapshot.paramMap.get('id');
    this.orderSubscription = this.orderService
      .getOrder(this.orderId)
      .subscribe((order) => {
        this.order = order;
        console.log(order);
      });
    console.log(this.orderId);
  }

  ngOnInit(): void {}
}
