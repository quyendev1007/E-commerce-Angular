import { Component, inject, Input } from '@angular/core';
import { IProduct } from '../../../types/product';
import { RouterModule } from '@angular/router';
import { Auth } from '../../../services/auth';

@Component({
  selector: 'app-product-item-explore',
  imports: [RouterModule],
  templateUrl: './product-item-explore.html',
  styleUrl: './product-item-explore.css',
})
export class ProductItemExplore {
  @Input() product: IProduct = {} as IProduct;

  isAuth = inject(Auth);

  stars = Array(5);

  addToCart(id: string) {
    if (!this.isAuth.isAuthenticated()) {
      alert('Ban phai dang nhap truoc');
      return;
    }
    alert(id);
  }
}
