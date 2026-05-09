import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

/**
 * Route guard: allow navigation only if profile() exists.
 * CanActivateFn is the functional (modern) guard style in Angular.
 */
export const authGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);
  if (auth.profile()) return true;
  return router.createUrlTree(['/login']);
};
