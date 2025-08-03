import { Component } from '@angular/core';
import { Banner } from '../../../components/client/banner/banner';
import { Category } from '../../../components/client/category/category';
import { SellingProduct } from '../../../components/client/selling-product/selling-product';
import { Products } from '../../../components/client/products/products';

@Component({
  selector: 'app-home',
  imports: [Banner, Category, SellingProduct, Products],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {}
