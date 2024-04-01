import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
export const customInterceptor: HttpInterceptorFn = (req, next) => {
  // let loggedUserData = {};
  let router = inject(Router);
  const localData = localStorage.getItem('token');
  let cloneReq: any = req;
  if (localData != null) {
    const loggedUserData = JSON.parse(localData);
    // loggedUserData.token
    debugger
    cloneReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${loggedUserData.token}`
      }
    });
  }
  // console.log('token-' + loggedUserData.token);
  // if (cloneReq.method == 'GET')
  //   return next(cloneReq);
  return next(cloneReq).pipe(
    catchError((error: HttpErrorResponse) => {
      localStorage.removeItem('token');
      location.reload();
      router.navigateByUrl('/products');
      return throwError(error)
    })
  );
}; 
