import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';

import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-category',
  imports: [ReactiveFormsModule],
  templateUrl: './edit-category.html',
  styleUrl: './edit-category.css',
})
export class EditCategory {
  http = inject(HttpClient);
  router = inject(Router);
  param = inject(ActivatedRoute);
  id: string = this.param.snapshot.params['id'];

  categoryForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
  });

  ngOnInit() {
    this.http.get(`http://localhost:8000/api/categories/${this.id}`).subscribe({
      next: (data: any) => {
        this.categoryForm.setValue({
          name: data.name,
        });
      },
      error: (err) => {
        alert('Failed to fetch category data');
      },
    });
  }

  onSubmit() {
    if (!this.categoryForm.valid) return;
    const categoryData = this.categoryForm.value;
    this.http
      .put(`http://localhost:8000/api/categories/${this.id}`, categoryData)
      .subscribe({
        next: (data: any) => {
          this.router.navigate(['/admin/categories']);
        },
        error: (err) => {
          alert('Failed to update category');
        },
      });
  }
}
