import { CanActivateFn, Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

export const adminGuard: CanActivateFn = (route, state) => {
  const accessToken = window.localStorage.getItem('accessToken');
  const router = new Router();

  if (accessToken) {
    const userInfo = jwtDecode(accessToken);
    const currentTime = Math.floor(Date.now() / 1000);

    if (userInfo.exp && userInfo.exp > currentTime) {
      return true;
    }

    router.navigate(['login']);
    return false;
  } else {
    router.navigate(['login']);
    return false;
  }
};
