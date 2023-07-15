import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';


export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const isAuthenticated = authService.isLoggedIn();

  
  if (state.url == '/') {
    
    if (!isAuthenticated) {
      return true;
    }
    router.navigate(['booking/wizard'])
    return false;

  } else {

    if (isAuthenticated) {
      return true;
    }
    router.navigate([''])
    return false;
  }



};
