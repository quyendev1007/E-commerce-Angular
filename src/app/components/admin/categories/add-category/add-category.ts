import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';

import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-category',
  imports: [ReactiveFormsModule],
  templateUrl: './add-category.html',
  styleUrl: './add-category.css',
})
export class AddCategory {
  http = inject(HttpClient);
  router = inject(Router);

  categoryForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
  });

  onSubmit() {
    if (!this.categoryForm.valid) return;
    const categoryData = this.categoryForm.value;
    this.http
      .post(`http://localhost:8000/api/categories`, categoryData)
      .subscribe({
        next: (data: any) => {
          this.categoryForm.reset();
          this.router.navigate(['/admin/categories']);
        },
        error: (err) => {
          console.error('Error adding category:', err);
          alert('Failed to add category');
        },
      });
  }
}
