import { AngularFireDatabase } from '@angular/fire/database';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private db: AngularFireDatabase) {}

  getAll() {
    return this.db
      .list('/categories', (ref) => ref.orderByChild('name'))
      .snapshotChanges()
      .pipe(
        map((categories) => {
          return categories.map((categoryMetaData) => {
            const data = {
              value: categoryMetaData.payload.val(),
              ...categoryMetaData,
            };
            return data;
          });
        })
      );
  }
}
