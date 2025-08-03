import { Component, Input } from '@angular/core';
import { IProduct } from '../../../types/product';

@Component({
  selector: 'app-product-item-explore',
  imports: [],
  templateUrl: './product-item-explore.html',
  styleUrl: './product-item-explore.css',
})
export class ProductItemExplore {
  @Input() product: IProduct = {} as IProduct;
  stars = Array(5);
}
