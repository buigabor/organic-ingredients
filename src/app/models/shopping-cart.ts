import { ShoppingCartItem } from './shopping-cart-item';
export class ShoppingCart {
  items: ShoppingCartItem[] = [];
  dateCreated: string;
  constructor(public itemsMap: { [productId: string]: ShoppingCartItem }) {
    for (const productId in itemsMap) {
      if (itemsMap.hasOwnProperty(productId)) {
        let item = itemsMap[productId];
        this.items.push(new ShoppingCartItem(item.product, item.quantity));
      }
    }
  }

  get totalItemsCount(): number {
    let count = 0;
    for (const productId in this.items) {
      if (productId) {
        count += this.items[productId].quantity;
      }
    }
    return count;
  }

  get totalPrice(): number {
    let sumPrice = 0;
    for (const item of this.items) {
      sumPrice += item.totalPrice;
    }
    return sumPrice;
  }
}
