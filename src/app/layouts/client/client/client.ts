import { Component } from '@angular/core';
import { Header } from '../header/header';
import { Footer } from '../footer/footer';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-client',
  imports: [Header, RouterOutlet, Footer],
  templateUrl: './client.html',
  styleUrl: './client.css',
})
export class Client {}
