import { ShoppingCart } from 'src/app/models/shopping-cart';
import { Observable } from 'rxjs';
import { ShoppingCartService } from './../services/shopping-cart/shopping-cart.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss'],
})
export class ShoppingCartComponent {
  cart$: Observable<ShoppingCart>;
  constructor(private cartService: ShoppingCartService) {}

  async ngOnInit() {
    this.cart$ = await this.cartService.getCart();
  }

  clearCart(productMap) {
    this.cartService.clearProductFromCart(productMap);
  }
}
