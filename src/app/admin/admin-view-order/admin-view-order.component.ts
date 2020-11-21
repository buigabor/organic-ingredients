import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-view-order',
  templateUrl: './admin-view-order.component.html',
  styleUrls: ['./admin-view-order.component.scss'],
})
export class AdminViewOrderComponent implements OnInit {
  orderId: string;
  constructor(private route: ActivatedRoute) {
    this.orderId = this.route.snapshot.paramMap.get('id');
    console.log(this.orderId);
  }

  ngOnInit(): void {}
}
