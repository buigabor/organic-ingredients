import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from './../../../shared/services/order-service/order.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-order-success',
  templateUrl: './order-success.component.html',
  styleUrls: ['./order-success.component.scss'],
})
export class OrderSuccessComponent implements OnInit {
  orderId;
  orderIdSub: Subscription;
  constructor(private router: ActivatedRoute) {}

  ngOnInit(): void {
    this.orderId = this.router.snapshot.params.id;
  }
}
