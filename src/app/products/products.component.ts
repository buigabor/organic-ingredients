import { CategoryService } from './../services/category/category.service';
import { ProductService } from './../services/product-service/product-service.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent {
  products$;
  categories$;
  constructor(
    private productService: ProductService,
    private categoryService: CategoryService
  ) {
    this.products$ = this.productService.getAll();
    this.categories$ = this.categoryService.getAll();
  }
}
