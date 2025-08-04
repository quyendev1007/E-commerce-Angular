import { Component, Input } from '@angular/core';
import { IProduct } from '../../../types/product';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-product-item-explore',
  imports: [RouterModule],
  templateUrl: './product-item-explore.html',
  styleUrl: './product-item-explore.css',
})
export class ProductItemExplore {
  @Input() product: IProduct = {} as IProduct;

  stars = Array(5);
}
