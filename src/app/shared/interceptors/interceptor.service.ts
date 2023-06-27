import { HTTP_INTERCEPTORS, HttpErrorResponse, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

   //Lo que pasa por http va ser intercertado por esta funcion
    intercept(
      req: HttpRequest<any>,
      next: HttpHandler
    ): Observable<HttpEvent<any>> {

    const accessToken = localStorage.getItem('token');

    const reqClone = req.clone({
      setHeaders: { Authorization: `Bearer ${accessToken}` }
    });

    return next.handle(reqClone).pipe(
      catchError(async (err) => {
        console.log(err);
        throw new Error('Error personalizado');;
      })
    );
  }

}


export const tokenInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: InterceptorService,
  multi: true
};
