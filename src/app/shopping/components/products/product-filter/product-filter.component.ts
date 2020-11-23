import { Component, Input, OnInit } from '@angular/core';
import { CategoryService } from 'shared/services/category/category.service';

@Component({
  selector: 'app-product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.scss'],
})
export class ProductFilterComponent implements OnInit {
  categories$;
  @Input() category;
  constructor(private categoryService: CategoryService) {
    this.categories$ = this.categoryService.getAll();
  }

  ngOnInit(): void {}
}
