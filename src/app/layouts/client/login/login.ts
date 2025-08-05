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
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  router = inject(Router);
  http = inject(HttpClient);

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });

  onSubmit() {
    if (!this.loginForm.valid) {
      return;
    }
    const formData = this.loginForm.value;
    this.http.post('http://localhost:8000/api/auth/login', formData).subscribe({
      next: (response: any) => {
        alert('Đăng nhập thành công');
        localStorage.setItem('accessToken', response.accessToken);
        localStorage.setItem('userInfo', JSON.stringify(response));
        this.router.navigate(['/admin']);
      },
      error: (error) => {
        console.error('Error during login:', error);
      },
    });
  }
}
