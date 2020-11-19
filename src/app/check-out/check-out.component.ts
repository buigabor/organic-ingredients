import { AuthService } from './../services/auth-service/auth.service';
import { OrderService } from './../services/order-service/order.service';
import { ShoppingCart } from './../models/shopping-cart';
import { ShoppingCartService } from './../services/shopping-cart/shopping-cart.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.scss'],
})
export class CheckOutComponent implements OnInit, OnDestroy {
  shippingForm = new FormGroup({
    nameControl: new FormControl('', [Validators.required]),
    addressControl: new FormControl('', [Validators.required]),
    cityControl: new FormControl('', [Validators.required]),
    stateControl: new FormControl('', [Validators.required]),
    countryControl: new FormControl('', [Validators.required]),
    zipControl: new FormControl('', [Validators.required]),
    commentControl: new FormControl(''),
  });

  shipping = {};
  cart: ShoppingCart;
  userId: string;
  cartSubscription: Subscription;
  userSubscription: Subscription;

  constructor(
    private authService: AuthService,
    private cartService: ShoppingCartService,
    private orderService: OrderService
  ) {}

  async ngOnInit() {
    let cart$ = await this.cartService.getCart();
    this.cartSubscription = cart$.subscribe((cart) => (this.cart = cart));
    this.userSubscription = this.authService.user$.subscribe(
      (user) => (this.userId = user.uid)
    );
  }

  onSubmit(form) {
    this.shipping = form;
    const order = {
      userId: this.userId,
      datePlaced: new Date().getTime(),
      shipping: this.shipping,
      items: this.cart.items.map((item) => {
        return {
          product: {
            title: item.value.title,
            imageUrl: item.value.imageUrl,
            price: item.value.price,
          },
          quantity: item.quantity,
          totalPrice: item.totalPrice,
        };
      }),
    };
    this.orderService.storeOrder(order);
  }

  ngOnDestroy() {
    this.cartSubscription.unsubscribe();
    this.userSubscription.unsubscribe();
  }
}
