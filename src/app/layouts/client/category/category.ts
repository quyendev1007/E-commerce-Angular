import { Component } from '@angular/core';
import { ProductItemExplore } from '../../../components/client/product-item-explore/product-item-explore';

@Component({
  selector: 'app-category',
  imports: [ProductItemExplore],
  templateUrl: './category.html',
  styleUrl: './category.css',
})
export class Category {
  list = Array(8);
}
