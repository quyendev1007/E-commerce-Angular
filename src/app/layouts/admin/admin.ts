import { Component } from '@angular/core';
import { HeaderAdmin } from '../../components/admin/header-admin/header-admin';
import { Sidebar } from '../../components/admin/sidebar/sidebar';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-admin',
  imports: [HeaderAdmin, Sidebar, RouterOutlet],
  templateUrl: './admin.html',
  styleUrl: './admin.css',
})
export class Admin {}
