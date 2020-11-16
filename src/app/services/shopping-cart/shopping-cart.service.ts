import { Observable } from 'rxjs';
import { AngularFireDatabase } from '@angular/fire/database';
import { Injectable } from '@angular/core';
import { FirebaseApp } from '@angular/fire';
import { ShoppingCart } from 'src/app/models/shopping-cart';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ShoppingCartService {
  constructor(private db: AngularFireDatabase, private firebase: FirebaseApp) {}

  private createCart() {
    return this.db.list('/shopping-carts').push({
      dateCreated: new Date().getTime(),
    });
  }

  async getCart() {
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

  getItem(cartId, productId) {
    return this.firebase
      .database()
      .ref('/shopping-carts/' + cartId + '/items/' + productId);
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

  async addToCart(product) {
    this.updateProductQuantity(product, 1);
  }

  async removeFromCart(product) {
    this.updateProductQuantity(product, -1);
  }

  private async updateProductQuantity(product, change: number) {
    const cartId = await this.getOrCreateCartId();
    const item$ = this.getItem(cartId, product.key);

    item$.once('value', (snapshot) => {
      const productInCart = snapshot.val();

      snapshot.ref.update({
        product: product.value,
        quantity: (productInCart ? productInCart.quantity : 0) + change,
      });
    });
  }
}
