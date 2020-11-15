import { switchMap } from 'rxjs/operators';
import { ProductService } from './../services/product-service/product-service.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent {
  products = [];
  filteredProducts = [];
  selectedCategory = null;
  constructor(
    private productService: ProductService,
    private route: ActivatedRoute
  ) {
    this.productService
      .getAll()
      .pipe(
        switchMap((products) => {
          this.products = products;
          return this.route.queryParams;
        })
      )
      .subscribe((queryParam) => {
        this.selectedCategory = queryParam.category;

        this.filteredProducts = this.selectedCategory
          ? this.products.filter((product) => {
              return product.category === this.selectedCategory;
            })
          : this.products;
      });
  }
}
