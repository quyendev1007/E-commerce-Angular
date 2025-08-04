import { Component, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { IProduct } from '../../../types/product';
import { ProductItemExplore } from '../../../components/client/product-item-explore/product-item-explore';

@Component({
  selector: 'app-detail',
  imports: [ProductItemExplore],
  templateUrl: './detail.html',
  styleUrl: './detail.css',
})
export class Detail {
  http = inject(HttpClient);
  param = inject(ActivatedRoute);
  id: string = this.param.snapshot.params['id'];
  product: IProduct = {} as IProduct;
  list: IProduct[] = [];
  stars = Array(5);
  currentImage: string = '';

  ngOnInit() {
    this.http.get(`http://localhost:8000/api/products/${this.id}`).subscribe({
      next: (data: any) => {
        this.product = data.product;
        this.list = data.similarProducts;
        this.currentImage = this.product.galleries[0];
      },
      error: (err) => {
        alert('Failed to fetch product details');
      },
    });
  }

  changeImage(image: string) {
    this.currentImage = image;
  }
}
