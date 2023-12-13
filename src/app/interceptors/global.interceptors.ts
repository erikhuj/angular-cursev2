import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable()
export class GlobalInterceptor implements HttpInterceptor {
  constructor() {
    console.log('Global Interceptor');
  }

  headers = new Headers().set('x-api-key', '7802c4c0');
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {

    const newReq = req.clone({
    //   headers: this.headers
    })
    
    return next.handle(newReq);
  }
}
