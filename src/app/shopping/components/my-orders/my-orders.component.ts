import { switchMap } from 'rxjs/operators';
import { AuthService } from './../../../shared/services/auth-service/auth.service';
import { OrderService } from 'shared/services/order-service/order.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.scss'],
})
export class MyOrdersComponent implements OnInit, OnDestroy {
  orders = [];
  userId;
  orderSubscription: Subscription;

  constructor(
    private orderService: OrderService,
    private authService: AuthService
  ) {
    this.orderSubscription = this.authService.user$
      .pipe(
        switchMap((user) => {
          return this.orderService.getOrdersByUser(user.uid);
        })
      )
      .subscribe((orders) => {
        this.orders = orders;
        console.log(this.orders);
      });
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.orderSubscription.unsubscribe();
  }
}
