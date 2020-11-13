import { Product, ProductMetaData } from './../../models/product';
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

  getProduct(productId) {
    return this.db.object<Product>('/products/' + productId).valueChanges();
  }

  update(productId, product) {
    return this.db.object('/products/' + productId).update(product);
  }

  delete(productId) {
    return this.db.object('/products/' + productId).remove();
  }
}
