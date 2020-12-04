import { ShoppingCartService } from 'shared/services/shopping-cart/shopping-cart.service';
import alanBtn from '@alan-ai/alan-sdk-web';
import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AlanAiService } from 'shared/services/alan-ai.service';
import { AuthService } from 'shared/services/auth-service/auth.service';
import { UserService } from 'shared/services/user-service/user.service';

import * as env from '../../env.json';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnDestroy {
  title = 'shop-for-ingredients';
  authSub: Subscription;
  alanAiBtnInstance;
  productMapSubscription: Subscription;

  constructor(
    private authService: AuthService,
    private router: Router,
    private userService: UserService,
    private alanAiService: AlanAiService,
    private cartService: ShoppingCartService
  ) {
    this.authSub = this.authService.user$.subscribe((user) => {
      if (user) {
        this.userService.save(user);
        const returnUrl = localStorage.getItem('returnUrl');
        if (returnUrl) {
          localStorage.removeItem('returnUrl');
          this.router.navigate([returnUrl]);
        }
      }
    });
    this.initializeAlan();
  }

  // Alan AI initialization and commands

  private initializeAlan() {
    if (this.alanAiBtnInstance != null) {
      return;
    }

    this.alanAiBtnInstance = alanBtn({
      bottom: '35px',
      left: '35px',
      key: `${env.ALAN_AI_API_KEY}`,
      onCommand: (commandData: {
        command: string;
        payload?: { quantity: number; name: string };
      }) => {
        if (commandData.command === 'open-cart') {
          this.alanAiBtnInstance.playText('Going to cart');
          this.alanAiService.goToCart();
          this.alanAiBtnInstance.deactivate();
        }

        if (commandData.command === 'add-item') {
          const productTitle = commandData.payload.name;
          const productQuantity = commandData.payload.quantity;
          const productTitleUpperCase = this.transformToTitleCase(productTitle);
          this.alanAiService.addItem(productTitleUpperCase, productQuantity);
          this.alanAiBtnInstance.playText(
            `Added ${productQuantity} ${productTitle} to cart`
          );
        }

        if (commandData.command === 'remove-item') {
          const productTitle = commandData.payload.name;
          const productTitleUpperCase = this.transformToTitleCase(productTitle);
          this.alanAiService.removeProductFromCart(productTitleUpperCase);
          this.alanAiBtnInstance.playText(
            `Removed ${productTitle} from your cart`
          );
        }

        if (commandData.command === 'clear-cart') {
          this.alanAiService.clearCart();
          this.alanAiBtnInstance.playText(`Clearing cart`);
        }

        if (commandData.command === 'purchase-items') {
          this.cartService.getCart().then((cart) => {
            cart.subscribe((shoppingCart) => {
              if (shoppingCart.items.length === 0) {
                this.alanAiBtnInstance.playText(`Your cart is empty`);
                this.alanAiBtnInstance.deactivate();
                return;
              }
              this.alanAiBtnInstance.playText(`Checking out`);
              this.alanAiService.checkout();
              this.alanAiBtnInstance.deactivate();
            });
          });
        }
      },
    });
  }

  ngOnDestroy(): void {
    this.authSub.unsubscribe();
    this.productMapSubscription.unsubscribe();
  }

  private transformToTitleCase(title) {
    const titleCase = title.toLowerCase().split(' ');
    for (let i = 0; i < titleCase.length; i++) {
      titleCase[i] =
        titleCase[i].charAt(0).toUpperCase() + titleCase[i].substring(1);
    }
    return titleCase.join(' ');
  }
}
