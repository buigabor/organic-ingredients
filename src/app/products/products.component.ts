import { ShoppingCartService } from './../services/shopping-cart/shopping-cart.service';
import { switchMap } from 'rxjs/operators';
import { ProductService } from './../services/product-service/product-service.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit, OnDestroy {
  productsMap = [];
  filteredProducts = [];
  selectedCategory: string | null = null;
  cart: any;
  cartSubscription: Subscription;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private cartService: ShoppingCartService
  ) {
    this.productService
      .getAll()
      .pipe(
        switchMap((productsMap) => {
          this.productsMap = productsMap;
          return this.route.queryParams;
        })
      )
      .subscribe((queryParam) => {
        this.selectedCategory = queryParam.category;

        this.filteredProducts = this.selectedCategory
          ? this.productsMap.filter((product) => {
              return product.value.category === this.selectedCategory;
            })
          : this.productsMap;
      });
  }

  async ngOnInit() {
    this.cartSubscription = (await this.cartService.getCart()).subscribe(
      (cart) => {
        this.cart = cart;
        console.log(this.cart);
      }
    );
  }

  ngOnDestroy(): void {
    this.cartSubscription.unsubscribe();
  }
}
