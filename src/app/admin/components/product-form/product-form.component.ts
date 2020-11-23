import { Product } from 'shared/models/product';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'shared/services/product-service/product-service.service';
import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';
import { CategoryService } from 'shared/services/category/category.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss'],
})
export class ProductFormComponent implements OnInit {
  categories$;
  productMap;
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
        .subscribe((productMap) => {
          const productMapVal: any = productMap.payload.val();
          const productMapInstance = {
            value: {
              title: productMapVal.title,
              category: productMapVal.category,
              imageUrl: productMapVal.imageUrl,
              price: productMapVal.price,
            },
            key: productMap.key,
          };

          this.productMap = productMapInstance;
        });
    } else {
      this.productMap = {
        value: { title: '', category: '', imageUrl: '', price: '' },
        key: '',
      };
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
