import { ShoppingCartService } from './../services/shopping-cart/shopping-cart.service';
import { Component, Input, OnInit } from '@angular/core';
import { ShoppingCart } from '../models/shopping-cart';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
})
export class ProductCardComponent implements OnInit {
  // tslint:disable
  @Input('productMap') productMap;
  @Input('show-actions') showActions = true;
  @Input('shopping-cart') shoppingCart: ShoppingCart;
  // tslint:enable
  constructor(private cartService: ShoppingCartService) {}

  ngOnInit(): void {}

  addToCart() {
    this.cartService.addToCart(this.productMap);
  }
}
