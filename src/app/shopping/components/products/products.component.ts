import { ShoppingCartService } from 'shared/services/shopping-cart/shopping-cart.service';
import { switchMap } from 'rxjs/operators';
import { ProductService } from 'shared/services/product-service/product-service.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  productsMap = [];
  filteredProducts = [];
  selectedCategory: string | null = null;
  cart$;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private cartService: ShoppingCartService
  ) {}

  async ngOnInit() {
    this.cart$ = await this.cartService.getCart();
    this.populateProducts();
  }

  private populateProducts() {
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
        this.applyFilter();
      });
  }

  private applyFilter() {
    this.filteredProducts = this.selectedCategory
      ? this.productsMap.filter(
          (product) => product.value.category === this.selectedCategory
        )
      : this.productsMap;
  }
}
