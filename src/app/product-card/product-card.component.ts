import { ShoppingCartService } from './../services/shopping-cart/shopping-cart.service';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
})
export class ProductCardComponent implements OnInit {
  // tslint:disable-next-line: no-input-rename
  @Input('product') product;
  // tslint:disable-next-line: no-input-rename
  @Input('show-actions') showActions = true;
  constructor(private cartService: ShoppingCartService) {}

  ngOnInit(): void {}

  addToCart(product) {
    this.cartService.addToCart(product);
  }
}
