import { ShoppingCart } from 'shared/models/shopping-cart';
import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Order } from 'shared/models/order';
import { AuthService } from 'shared/services/auth-service/auth.service';
import { OrderService } from 'shared/services/order-service/order.service';

@Component({
  selector: 'app-shipping-form',
  templateUrl: './shipping-form.component.html',
  styleUrls: ['./shipping-form.component.scss'],
})
export class ShippingFormComponent implements OnInit, OnDestroy {
  shippingForm = new FormGroup({
    nameControl: new FormControl('', [Validators.required]),
    addressControl: new FormControl('', [Validators.required]),
    cityControl: new FormControl('', [Validators.required]),
    stateControl: new FormControl('', [Validators.required]),
    countryControl: new FormControl('', [Validators.required]),
    zipControl: new FormControl('', [Validators.required]),
    commentControl: new FormControl(''),
  });

  @Input() shoppingCart: ShoppingCart;
  shipping = {};
  userId: string;
  userSubscription: Subscription;

  constructor(
    private authService: AuthService,
    private orderService: OrderService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userSubscription = this.authService.user$.subscribe(
      (user) => (this.userId = user.uid)
    );
  }

  async onSubmit(form) {
    this.shipping = form;
    const order = new Order(this.userId, this.shipping, this.shoppingCart);
    const result = await this.orderService.placeOrder(order);
    this.router.navigate(['/order-success/', result.key]);
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }
}
