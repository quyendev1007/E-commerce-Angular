import { Component } from '@angular/core';
import { ProductItem } from '../../../components/client/product-item/product-item';

@Component({
  selector: 'app-detail',
  imports: [ProductItem],
  templateUrl: './detail.html',
  styleUrl: './detail.css',
})
export class Detail {
  list = Array(4);
  stars = Array(5);
}
