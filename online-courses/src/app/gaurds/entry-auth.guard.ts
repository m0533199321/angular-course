import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const entryAuthGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  if (!sessionStorage.getItem('authToken')) {
    router.navigate(['/signIn']);
  }
  return true;
};
