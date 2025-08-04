import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  router = inject(Router);
  http = inject(HttpClient);

  registerForm = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
    phone: new FormControl('', [
      Validators.required,
      Validators.pattern('^[0-9]{10,15}$'),
    ]),
  });

  onSubmit() {
    if (!this.registerForm.valid) {
      return;
    }
    const formData = this.registerForm.value;
    this.http
      .post('http://localhost:8000/api/auth/register', formData)
      .subscribe({
        next: (response: any) => {
          alert('Đăng ký thành công');
          this.router.navigate(['/login']);
        },
        error: (error) => {
          console.error('Error during registration:', error);
        },
      });
  }
}
