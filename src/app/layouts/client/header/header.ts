import { Component, inject } from '@angular/core';
import { Auth } from '../../../services/auth';
import { Router, RouterModule } from '@angular/router';
import { IProduct } from '../../../types/product';
import { debounce } from '../../../utils/debounce';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-header',
  imports: [RouterModule],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  router = inject(Router);
  isAuth = inject(Auth);
  isLogin = false;
  productSearch: IProduct[] = [];
  searchQuery: boolean = false;
  http = inject(HttpClient);

  constructor() {
    this.searchProduct = debounce(this.searchProduct.bind(this), 500);
  }
  ngOnInit() {
    this.isLogin = this.isAuth.isAuthenticated();
  }

  logout() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('userInfo');
    this.isLogin = false;
    this.router.navigate(['login']);
  }

  searchProduct(query: string) {
    if (query.length > 0) {
      this.searchQuery = true;
    } else {
      this.searchQuery = false;
    }
    this.http
      .get<IProduct[]>(
        `http://localhost:8000/api/products?search=${query}&limit=5`
      )
      .subscribe({
        next: (data: any) => {
          this.productSearch = data.docs;
        },
        error: (err) => {
          console.error('Error fetching search results:', err);
        },
      });
  }

  handleNavigate(productId: string) {
    this.searchQuery = false;
    this.productSearch = [];
    this.router.navigate(['/details', productId]);
  }
}
