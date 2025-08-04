import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { ICategory } from '../../../types/product';

@Component({
  selector: 'app-category',
  imports: [],
  templateUrl: './category.html',
  styleUrl: './category.css',
})
export class Category {
  http = inject(HttpClient);
  categories: ICategory[] = [];

  ngOnInit() {
    this.http.get('http://localhost:8000/api/categories').subscribe({
      next: (data: any) => {
        this.categories = data.docs;
      },
      error: (err) => {
        console.error('Error fetching categories:', err);
      },
    });
  }
}
