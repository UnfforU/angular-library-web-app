import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const snackBar = inject(MatSnackBar);

  if(!authService.isAuthenticated()){
    snackBar.open("Access expired, please log in", "Ok",{duration: 5000});
    router.navigate(['']);
    return false;
  } 
  else {
    return true;
  }
};
