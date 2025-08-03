import { Routes } from '@angular/router';
import { Client } from './layouts/client/client/client';
import { Home } from './layouts/client/home/home';
import { Login } from './layouts/client/login/login';
import { Category } from './layouts/client/category/category';
import { NotFound } from './layouts/client/not-found/not-found';
import { Detail } from './layouts/client/detail/detail';
import { Admin } from './layouts/admin/admin';
import { Dashboard } from './components/admin/dashboard/dashboard';
import { Products } from './components/admin/products/products';
import { Categories } from './components/admin/categories/categories';
import { AddProduct } from './components/admin/products/add-product/add-product';
import { EditProduct } from './components/admin/products/edit-product/edit-product';
import { AddCategory } from './components/admin/categories/add-category/add-category';
import { EditCategory } from './components/admin/categories/edit-category/edit-category';

export const routes: Routes = [
  {
    path: '',
    component: Client,
    children: [
      { path: '', component: Home },
      { path: 'login', component: Login },
      { path: 'categories', component: Category },
      { path: 'details', component: Detail },
    ],
  },
  {
    path: 'admin',
    component: Admin,
    children: [
      { path: '', component: Dashboard },
      { path: 'products', component: Products },
      { path: 'add-product', component: AddProduct },
      { path: 'edit-product/:id', component: EditProduct },
      { path: 'categories', component: Categories },
      { path: 'add-category', component: AddCategory },
      { path: 'edit-category/:id', component: EditCategory },
    ],
  },
  { path: '**', component: NotFound },
];
