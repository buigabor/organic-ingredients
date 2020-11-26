import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from 'shared/services/order-service/order.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-my-order',
  templateUrl: './view-my-order.component.html',
  styleUrls: ['./view-my-order.component.scss'],
})
export class ViewMyOrderComponent implements OnInit {
  orderId: string;
  order;
  orderSubscription: Subscription;
  constructor(
    private orderService: OrderService,
    private route: ActivatedRoute
  ) {
    route.paramMap.subscribe((order) => {
      this.orderId = order.get('id');
    });
    this.orderSubscription = this.orderService
      .getOrder(this.orderId)
      .subscribe((order) => {
        this.order = order;
        console.log(this.order);
      });
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.orderSubscription.unsubscribe();
  }
}
