import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IProduct } from '../../../types/product';

@Component({
  selector: 'app-products',
  imports: [RouterModule],
  templateUrl: './products.html',
  styleUrl: './products.css',
})
export class Products {
  http = inject(HttpClient);
  products: IProduct[] = [];

  ngOnInit() {
    this.http.get(`http://localhost:8000/api/products?limit=8`).subscribe({
      next: (data: any) => {
        this.products = data?.docs;
      },
    });
  }

  handleDelete(id: string) {
    if (confirm('Are you sure you want to delete this product?')) {
      this.http.delete(`http://localhost:8000/api/products/${id}`).subscribe({
        next: () => {
          this.products = this.products.filter((product) => product._id !== id);
        },
        error: (err) => {
          console.error('Error deleting product:', err);
        },
      });
    }
  }
}
