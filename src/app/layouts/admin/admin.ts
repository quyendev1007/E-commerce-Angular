import { Component, inject } from '@angular/core';
import { HeaderAdmin } from '../../components/admin/header-admin/header-admin';
import { Sidebar } from '../../components/admin/sidebar/sidebar';
import { Router, RouterOutlet } from '@angular/router';
import { Auth } from '../../services/auth';

@Component({
  selector: 'app-admin',
  imports: [HeaderAdmin, Sidebar, RouterOutlet],
  templateUrl: './admin.html',
  styleUrl: './admin.css',
})
export class Admin {
  isAuth = inject(Auth);
  router = inject(Router);
  ngOnInit() {
    if (!this.isAuth.isAuthenticated()) {
      this.router.navigate(['login']);
    }
  }
}
