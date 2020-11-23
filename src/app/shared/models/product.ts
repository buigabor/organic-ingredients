import { DatabaseSnapshot, ListenEvent } from '@angular/fire/database';

export interface Product {
  category: string;
  imageUrl: string;
  price: number;
  title: string;
}

export interface ProductMetaData {
  products: {
    prevKey: string;
    key: string;
    type: ListenEvent;
    payload: DatabaseSnapshot<unknown>;
    value: unknown;
  };
}
