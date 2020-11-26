import { AngularFireDatabase, SnapshotAction } from '@angular/fire/database';
import { Injectable } from '@angular/core';
import { ShoppingCartService } from '../shopping-cart/shopping-cart.service';
import { map } from 'rxjs/operators';
import { Order } from 'shared/models/order';

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

  getOrdersByUser(userId) {
    return this.db
      .list('/orders', (ref) => ref.orderByChild('userId').equalTo(userId))
      .snapshotChanges()
      .pipe(
        map((ordersMap) => {
          // create order objects where the order key is also a property
          const orders = ordersMap.map((order: SnapshotAction<Order>) => {
            const orderVal = order.payload.val();
            return {
              ...orderVal,
              key: order.key,
            };
          });
          console.log(orders);

          return orders;
        })
      );
  }

  getOrder(orderId) {
    return this.db.object('/orders/' + orderId).valueChanges();
  }

  placeOrder(order) {
    const result = this.db.list('/orders').push(order);
    this.cartService.clearCart();
    return result;
  }
}
