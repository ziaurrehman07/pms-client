import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';

export const adminGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const role = authService.getRole();
  
  if (authService.isLoggedIn() && role === 'admin') {
    return true;
  } else {
    router.navigate(['/login']);
    return false;
  }
};
