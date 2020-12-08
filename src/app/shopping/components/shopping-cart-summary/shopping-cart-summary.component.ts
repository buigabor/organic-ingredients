import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-shopping-cart-summary',
  templateUrl: './shopping-cart-summary.component.html',
  styleUrls: ['./shopping-cart-summary.component.scss'],
})
export class ShoppingCartSummaryComponent {
  // tslint:disable-next-line: no-input-rename
  @Input() shoppingCart;
  constructor() {}
  ngOnInit(): void {}
}
