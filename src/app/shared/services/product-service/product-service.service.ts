import firebase from 'firebase/app';
import { AngularFireDatabase } from '@angular/fire/database';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private db: AngularFireDatabase) {}

  create(product) {
    return this.db.list('/products').push(product);
  }

  getAll() {
    return this.db
      .list('/products')
      .snapshotChanges()
      .pipe(
        map((products) => {
          return products.map((productsMetaData) => {
            const data = {
              value: productsMetaData.payload.val(),
              ...productsMetaData,
            };
            return data;
          });
        })
      );
  }

  getProductByTitle(productName) {
    let productKey;
    firebase
      .database()
      .ref('/products')
      .orderByChild('title')
      .equalTo(productName)
      .on('value', (result) => {
        let productMap = result.val();
        for (const key in productMap) {
          productKey = key;
        }
      });

    return this.getProduct(productKey);
  }

  getProduct(productId) {
    return this.db
      .object('/products/' + productId)
      .snapshotChanges()
      .pipe(
        map((product) => {
          return { value: product.payload.val(), ...product };
        })
      );
  }

  update(productId, product) {
    return this.db.object('/products/' + productId).update(product);
  }

  delete(productId) {
    return this.db.object('/products/' + productId).remove();
  }
}
