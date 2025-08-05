import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  isAuthenticated(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      const accessToken = localStorage.getItem('accessToken');
      if (accessToken) {
        const decodedToken: any = jwtDecode(accessToken);
        const currentTime = Math.floor(Date.now() / 1000);
        if (decodedToken.exp && decodedToken.exp > currentTime) {
          return true;
        }
        return false;
      }
    }
    return false;
  }

  getUserInfo() {
    if (isPlatformBrowser(this.platformId)) {
      if (this.isAuthenticated()) {
        const userInfo = localStorage.getItem('userInfo');
        return userInfo ? JSON.parse(userInfo) : null;
      }
    }

    return null;
  }
}
