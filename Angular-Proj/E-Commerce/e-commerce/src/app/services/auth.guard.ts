import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LoginComponent } from '../components/login/login.component';

export const authGuard: CanActivateFn = (route, state) => {
  debugger
  const router = inject(Router);
  const loginComponent = inject(LoginComponent);
  const localData = localStorage.getItem('token');
  if (localData != null) {
    return true;
  } else {
    loginComponent.Openpopup();
    // router.navigateByUrl('/login');
    // window.location.reload();
    return false;
  }
};
