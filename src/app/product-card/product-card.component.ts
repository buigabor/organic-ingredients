import { ShoppingCartService } from './../services/shopping-cart/shopping-cart.service';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
})
export class ProductCardComponent implements OnInit {
  @Input('product') product;
  @Input('show-actions') showActions = true;
  @Input('shopping-cart') shoppingCart;
  constructor(private cartService: ShoppingCartService) {}

  ngOnInit(): void {}

  addToCart() {
    this.cartService.addToCart(this.product);
  }

  getQuantity(): number {
    if (!this.shoppingCart) {
      return 0;
    }

    const item = this.shoppingCart.itemsMap[this.product.key];
    return item ? item.quantity : 0;
  }

  removeFromCart() {
    this.cartService.removeFromCart(this.product);
  }
}
