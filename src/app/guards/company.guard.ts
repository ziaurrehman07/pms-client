import { CanActivateFn } from '@angular/router';

export const companyGuard: CanActivateFn = (route, state) => {
  return true;
};
