import { ShoppingCartService } from 'shared/services/shopping-cart/shopping-cart.service';
import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';

@Component({
  selector: 'app-product-quantity',
  templateUrl: './product-quantity.component.html',
  styleUrls: ['./product-quantity.component.scss'],
})
export class ProductQuantityComponent {
  // tslint:disable
  @Input('product') productMap;
  @Input('show-actions') showActions = true;
  @Input('shopping-cart') shoppingCart;
  // tslint:enable
  constructor(private cartService: ShoppingCartService) {}

  addToCart() {
    this.cartService.addToCart(this.productMap);
  }

  removeFromCart() {
    this.cartService.subtractQuantity(this.productMap);
  }
}
