import { ShoppingCartItem } from './shopping-cart-item';
export class ShoppingCart {
  items = [];
  dateCreated: string;
  constructor(private itemsMap: { [productId: string]: ShoppingCartItem }) {
    this.itemsMap = itemsMap || {};

    for (const productId in itemsMap) {
      if (itemsMap.hasOwnProperty(productId)) {
        const item = itemsMap[productId];
        this.items.push(
          new ShoppingCartItem({
            ...item,
            key: productId,
          })
        );
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

  getQuantity(productMap): number {
    const item = this.itemsMap[productMap.key];
    return item ? item.quantity : 0;
  }
}
