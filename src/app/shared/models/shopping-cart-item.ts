export class ShoppingCartItem {
  value: {
    price: number;
    title: string;
    imageUrl: string;
  };
  key: string;
  quantity: number;

  // This looks extremely ugly, but I couldn't find another solution yet.
  constructor(init?) {
    this.value = {
      price: 0,
      title: '',
      imageUrl: '',
    };
    this.key = '';
    this.value.price = init.price;
    this.value.title = init.title;
    this.value.imageUrl = init.imageUrl;
    this.key = init.key;
    this.quantity = init.quantity;
  }

  get totalPrice(): number {
    return this.value.price * this.quantity;
  }
}
