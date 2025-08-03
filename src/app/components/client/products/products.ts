import { Component, inject } from '@angular/core';
import { ProductItemExplore } from '../product-item-explore/product-item-explore';
import { IProduct } from '../../../types/product';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-products',
  imports: [ProductItemExplore],
  templateUrl: './products.html',
  styleUrl: './products.css',
})
export class Products {
  row = Array(4);
  products: IProduct[] = [];
  http = inject(HttpClient);

  ngOnInit() {
    this.http.get(`http://localhost:8000/api/products?limit=8`).subscribe({
      next: (data: any) => {
        this.products = data?.docs;
      },
    });
  }
}
