import { Component, inject } from '@angular/core';
import { IBrand, ICategory } from '../../../../types/product';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-product',
  imports: [ReactiveFormsModule],
  templateUrl: './edit-product.html',
  styleUrl: './edit-product.css',
})
export class EditProduct {
  http = inject(HttpClient);
  router = inject(Router);
  param = inject(ActivatedRoute);
  id: string = this.param.snapshot.params['id'];

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

    this.http.get(`http://localhost:8000/api/products/${this.id}`).subscribe({
      next: (data: any) => {
        const productData = data.product;

        this.productForm.setValue({
          name: productData.name,
          price: productData.price,
          description: productData.description,
          image: productData.image,
          quantity: productData.quantity,
          brand_id: productData.brand_id._id,
          category_id: productData.category_id._id,
        });
      },
      error: (err) => {
        console.error('Error fetching product details:', err);
      },
    });
  }

  onSubmit() {
    if (!this.productForm.valid) return;
    const productData = this.productForm.value;
    this.http
      .put(`http://localhost:8000/api/products/${this.id}`, productData)
      .subscribe({
        next: (data: any) => {
          this.router.navigate(['/admin/products']);
        },
        error: (err) => {
          alert('Failed to update product');
        },
      });
  }
}
