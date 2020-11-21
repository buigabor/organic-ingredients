import { ShoppingCartService } from './../shopping-cart/shopping-cart.service';
import { AngularFireDatabase } from '@angular/fire/database';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(
    private db: AngularFireDatabase,
    private cartService: ShoppingCartService
  ) {}

  getOrders() {
    return this.db.list('/orders').snapshotChanges();
  }

  placeOrder(order) {
    const result = this.db.list('/orders').push(order);
    this.cartService.clearCart();
    return result;
  }
}
