import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { ICategory } from '../../../types/product';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-banner',
  imports: [RouterModule],
  templateUrl: './banner.html',
  styleUrl: './banner.css',
})
export class Banner {
  http = inject(HttpClient);
  categories: ICategory[] = [];

  ngOnInit() {
    this.http.get('http://localhost:8000/api/categories').subscribe({
      next: (data: any) => {
        this.categories = data?.docs;
      },
      error: (err) => {
        console.error('Error fetching categories:', err);
      },
    });
  }
}
