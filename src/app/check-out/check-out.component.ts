import { ShoppingCart } from './../models/shopping-cart';
import { ShoppingCartService } from './../services/shopping-cart/shopping-cart.service';
import { Component, OnInit } from '@angular/core';
import { Subscription, Observable } from 'rxjs';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.scss'],
})
export class CheckOutComponent implements OnInit {
  cart$: Observable<ShoppingCart>;

  cartSubscription: Subscription;

  constructor(private cartService: ShoppingCartService) {}

  async ngOnInit() {
    this.cart$ = await this.cartService.getCart();
  }
}
