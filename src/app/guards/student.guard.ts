import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';

export const studentGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const role = authService.getRole();
  
  if (authService.isLoggedIn() && role === 'student') {
    return true;
  } else {
    router.navigate(['/login']);
    return false;
  }
};
