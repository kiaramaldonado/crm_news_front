import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthTokenInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    console.log('Pasa por el interceptor')

    const token = localStorage.getItem('token');

    if (token) {
      request = request.clone({
        setHeaders: {
          authorization: token
        }
      });
    }

    return next.handle(request);
  }
}
