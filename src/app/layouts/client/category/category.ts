import { Component, inject } from '@angular/core';
import { ProductItemExplore } from '../../../components/client/product-item-explore/product-item-explore';
import { ActivatedRoute } from '@angular/router';
import { IProduct } from '../../../types/product';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-category',
  imports: [ProductItemExplore],
  templateUrl: './category.html',
  styleUrl: './category.css',
})
export class Category {
  param = inject(ActivatedRoute);
  categoryId: string = this.param.snapshot.params['id'];
  categoryName: string = '';
  http = inject(HttpClient);
  list = Array(8);
  products: IProduct[] = [];

  ngOnInit() {
    this.http
      .get(`http://localhost:8000/api/categories/${this.categoryId}`)
      .subscribe({
        next: (data: any) => {
          this.categoryName = data.name;
          this.products = data.products;
        },
        error: (err) => {
          alert('Failed to fetch category data');
        },
      });
  }
}
