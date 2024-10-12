import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const role = authService.getRole();
  const requiredRole = route.data?.['role'];
  
  if (authService.isLoggedIn() && role === requiredRole) {
    return true;
  } else {
    router.navigate(['/login']);
    return false;
  }
};
