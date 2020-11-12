import { Router } from '@angular/router';
import { ProductService } from './../../services/product-service/product-service.service';
import { CategoryService } from './../../services/category/category.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss'],
})
export class ProductFormComponent implements OnInit {
  categories$;
  constructor(
    private categoryService: CategoryService,
    private productService: ProductService,
    private router: Router
  ) {
    this.categories$ = this.categoryService.getCategories();
  }

  ngOnInit(): void {}

  onSubmit(product) {
    this.productService.create(product);
    this.router.navigate(['/admin/products']);
  }
}
