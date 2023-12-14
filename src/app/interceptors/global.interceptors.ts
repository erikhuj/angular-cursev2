import { Injectable } from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
@Injectable()
export class GlobalInterceptor implements HttpInterceptor {
  constructor() {
    console.log('Global Interceptor');
  }

  headers = new HttpHeaders().set('x-api-key', '7802c4c0');
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const bearerOnLocalstorage = localStorage.getItem('bearerToken');

    const newReq = req.clone({
      headers: this.headers.set(
        'Authorization',
        'Bearer ' + bearerOnLocalstorage
      ),
    });

    return next.handle(newReq).pipe(
      catchError((error: HttpErrorResponse) => {
        console.log(error);
         
        return throwError(() => {
          alert('algo malo ocurrio ' + JSON.stringify(error) );
        });;
      })
    )
  }
}
