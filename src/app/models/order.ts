import { ShoppingCart } from 'src/app/models/shopping-cart';
export class Order {
  datePlaced: number;
  items: any[];

  constructor(
    public userId: any,
    public shippingDetails: any,
    shoppingCart: ShoppingCart
  ) {
    this.datePlaced = new Date().getTime();
    this.items = shoppingCart.items.map((item) => {
      return {
        product: {
          title: item.value.title,
          imageUrl: item.value.imageUrl,
          price: item.value.price,
        },
        quantity: item.quantity,
        totalPrice: item.totalPrice,
      };
    });
  }
}
