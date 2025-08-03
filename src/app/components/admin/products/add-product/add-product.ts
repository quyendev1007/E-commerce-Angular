import { Component, inject } from '@angular/core';
import { IBrand, ICategory } from '../../../../types/product';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-product',
  imports: [ReactiveFormsModule],
  templateUrl: './add-product.html',
  styleUrl: './add-product.css',
})
export class AddProduct {
  http = inject(HttpClient);
  router = inject(Router);

  brands: IBrand[] = [];
  categories: ICategory[] = [];
  productForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    price: new FormControl('', [Validators.required, Validators.min(0)]),
    description: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    image: new FormControl('', [Validators.required]),
    quantity: new FormControl('', [Validators.required, Validators.min(0)]),
    brand_id: new FormControl('', [Validators.required]),
    category_id: new FormControl('', [Validators.required]),
  });

  ngOnInit() {
    this.http.get(`http://localhost:8000/api/brands`).subscribe({
      next: (data: any) => {
        this.brands = data?.docs;
      },
      error: (err) => {
        console.error('Error fetching brands:', err);
      },
    });

    this.http.get(`http://localhost:8000/api/categories`).subscribe({
      next: (data: any) => {
        this.categories = data?.docs;
      },
      error: (err) => {
        console.error('Error fetching categories:', err);
      },
    });
  }

  onSubmit() {
    if (!this.productForm.valid) return;
    const productData = this.productForm.value;
    this.http
      .post(`http://localhost:8000/api/products`, productData)
      .subscribe({
        next: (data: any) => {
          this.productForm.reset();
          this.router.navigate(['/admin/products']);
        },
        error: (err) => {
          console.error('Error adding product:', err);
          alert('Failed to add product');
        },
      });
  }
}
