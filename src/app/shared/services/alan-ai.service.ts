import { ShoppingCartService } from './shopping-cart/shopping-cart.service';
import { ProductService } from 'shared/services/product-service/product-service.service';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AlanAiService {
  constructor(
    private router: Router,
    private productService: ProductService,
    private cartService: ShoppingCartService
  ) {}

  goToCart() {
    this.router.navigate(['/shopping-cart']);
  }

  addItem(productTitle, productQuantity) {
    let productMap;
    this.productService
      .getProductByTitle(productTitle)
      .pipe(take(1))
      .subscribe((productMapResult) => {
        productMap = productMapResult;
        console.log(productMap);

        this.cartService.updateProduct(productMap, productQuantity);
      });
  }

  removeProductFromCart(productTitle) {
    let productMap;
    this.productService
      .getProductByTitle(productTitle)
      .pipe(take(1))
      .subscribe((productMapResult) => {
        productMap = productMapResult;
        this.cartService.removeProductFromCart(productMap);
      });
  }

  clearCart() {
    this.cartService.clearCart();
  }

  checkout() {
    this.router.navigate(['/check-out']);
  }
}
