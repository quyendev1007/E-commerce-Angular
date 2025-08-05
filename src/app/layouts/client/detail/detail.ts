import { Component, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { IComment, IProduct } from '../../../types/product';
import { ProductItemExplore } from '../../../components/client/product-item-explore/product-item-explore';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Auth } from '../../../services/auth';

@Component({
  selector: 'app-detail',
  imports: [ProductItemExplore, ReactiveFormsModule],
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
  isAuth = inject(Auth);
  router = inject(Router);
  comments: IComment[] = [];

  commentForm = new FormGroup({
    content: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
  });

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

    this.http.get(`http://localhost:8000/api/comments/${this.id}`).subscribe({
      next: (data: any) => {
        this.comments = data;
      },
      error: (err) => {
        alert('Failed to fetch comments');
      },
    });
  }

  changeImage(image: string) {
    this.currentImage = image;
  }

  addNewComment() {
    if (!this.isAuth.isAuthenticated()) {
      alert('Bạn cần phải đăng nhập trước khi bình luận');
      this.router.navigate(['login']);
      return;
    }

    if (!this.commentForm.valid) return;

    const content = this.commentForm.value;
    const data: any = { ...content };
    const currentUser = this.isAuth.getUserInfo();

    data.user_id = currentUser.id;
    data.product_id = this.id;

    this.http.post('http://localhost:8000/api/comments', data).subscribe({
      next: (data) => {
        location.reload();
      },
    });
  }
}
