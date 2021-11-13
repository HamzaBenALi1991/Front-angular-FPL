import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';



@Injectable()


export class YourInterceptor implements HttpInterceptor {

  constructor() { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token');
    if (token != null) {
      const nesRequest = req.clone({
        setHeaders: {
          "Authorization": `Bearer ${token}`
        }
      })
      return next.handle(nesRequest);

    } else {
      return next.handle(req)
    }
  }
}

