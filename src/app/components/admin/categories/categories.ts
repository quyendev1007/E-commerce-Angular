import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ICategory } from '../../../types/product';

@Component({
  selector: 'app-categories',
  imports: [RouterModule],
  templateUrl: './categories.html',
  styleUrl: './categories.css',
})
export class Categories {
  http = inject(HttpClient);
  categories: ICategory[] = [];

  ngOnInit() {
    this.http.get(`http://localhost:8000/api/categories`).subscribe({
      next: (data: any) => {
        this.categories = data?.docs;
      },
    });
  }

  handleDelete(id: string) {
    if (confirm('Are you sure you want to delete this category?')) {
      this.http.delete(`http://localhost:8000/api/categories/${id}`).subscribe({
        next: () => {
          this.categories = this.categories.filter(
            (category) => category._id !== id
          );
        },
        error: (err) => {
          console.error('Error deleting category:', err);
        },
      });
    }
  }
}
