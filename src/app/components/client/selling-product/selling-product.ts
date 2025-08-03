import { Component } from '@angular/core';
import { ProductItem } from '../product-item/product-item';

@Component({
  selector: 'app-selling-product',
  imports: [ProductItem],
  templateUrl: './selling-product.html',
  styleUrl: './selling-product.css',
})
export class SellingProduct {
  list = Array(4);
}
