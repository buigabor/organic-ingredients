import { AngularFireDatabase } from '@angular/fire/database';
import { Injectable } from '@angular/core';
import { FirebaseApp } from '@angular/fire';

import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ShoppingCart } from 'shared/models/shopping-cart';

@Injectable({
  providedIn: 'root',
})
export class ShoppingCartService {
  constructor(private db: AngularFireDatabase, private firebase: FirebaseApp) {}

  getItem(cartId, productId) {
    return this.firebase
      .database()
      .ref('/shopping-carts/' + cartId + '/items/' + productId);
  }

  async removeProductFromCart(productMap) {
    const cartId = await this.getOrCreateCartId();
    this.firebase
      .database()
      .ref('/shopping-carts/' + cartId + '/items/' + productMap.key)
      .remove();
  }

  async clearCart() {
    const cartId = await this.getOrCreateCartId();
    this.firebase
      .database()
      .ref('/shopping-carts/' + cartId + '/items')
      .remove();
  }

  async getCart(): Promise<Observable<ShoppingCart>> {
    const cartId = await this.getOrCreateCartId();
    return this.db
      .object('/shopping-carts/' + cartId)
      .valueChanges()
      .pipe(
        map((cart: any) => {
          return new ShoppingCart(cart.items);
        })
      );
  }

  async addToCart(productMap) {
    this.updateProduct(productMap, 1);
  }

  async subtractQuantity(productMap) {
    this.updateProduct(productMap, -1);
  }

  async updateProduct(productMap, change: number) {
    const cartId = await this.getOrCreateCartId();
    const item$ = this.getItem(cartId, productMap.key);

    item$.once('value', (snapshot) => {
      const productInCart = snapshot.val();
      const quantity = (productInCart ? productInCart.quantity : 0) + change;
      if (quantity === 0) {
        item$.remove();
      } else {
        item$.update({
          title: productMap.value.title,
          imageUrl: productMap.value.imageUrl,
          price: productMap.value.price,
          quantity,
        });
      }
    });
  }

  private createCart() {
    return this.db.list('/shopping-carts').push({
      dateCreated: new Date().getTime(),
    });
  }

  private async getOrCreateCartId(): Promise<string> {
    const cartId = localStorage.getItem('cartId');
    if (cartId) {
      return cartId;
    }

    const result = await this.createCart();
    localStorage.setItem('cartId', result.key);
    return result.key;
  }
}
