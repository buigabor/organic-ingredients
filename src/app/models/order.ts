import { ShoppingCart } from 'src/app/models/shopping-cart';
export class Order {
  datePlaced: number;
  items: any[];
  cartTotalPrice: number;

  constructor(
    public userId: any,
    public shippingDetails: any,
    shoppingCart: ShoppingCart
  ) {
    this.datePlaced = new Date().getTime();
    this.cartTotalPrice = shoppingCart.totalPrice;
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
