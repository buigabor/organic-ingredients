import { Product } from './../../models/product';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from './../../services/product-service/product-service.service';
import { CategoryService } from './../../services/category/category.service';
import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss'],
})
export class ProductFormComponent implements OnInit {
  categories$;
  product: Product = {
    title: undefined,
    price: undefined,
    imageUrl: undefined,
    category: undefined,
  };
  productId: string;
  constructor(
    private categoryService: CategoryService,
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.categories$ = this.categoryService.getAll();
    this.productId = this.route.snapshot.paramMap.get('id');

    if (this.productId) {
      this.productService
        .getProduct(this.productId)
        .pipe(take(1))
        .subscribe((product) => {
          this.product = product;
        });
    }
  }

  ngOnInit(): void {}

  onSubmit(product: Product): void {
    if (this.productId) {
      this.productService.update(this.productId, product);
    } else {
      this.productService.create(product);
    }
    this.router.navigate(['/admin/products']);
  }

  deleteProduct(): void {
    if (!confirm('Are you sure you want to delete this product?')) {
      return;
    }
    this.productService.delete(this.productId);
    this.router.navigate(['/admin/products']);
  }
}
