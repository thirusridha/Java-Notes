import { HttpInterceptorFn } from '@angular/common/http';

export const customInterceptor: HttpInterceptorFn = (req, next) => {
  let loggedUserData = {};
  const localData = localStorage.getItem('token');
  if (localData != null) {
    loggedUserData = JSON.parse(localData);
  }
  debugger
  const cloneReq = req.clone({
    setHeaders: {

      Authorization: `Bearer ${loggedUserData}`
    }
  });
  if (cloneReq.method == 'GET')
    return next(cloneReq);
  return next(cloneReq);
};
