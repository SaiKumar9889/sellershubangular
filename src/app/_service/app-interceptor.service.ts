import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class AppInterceptorService implements HttpInterceptor {

  constructor() { }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // ////console.log(request);
    // request = request.clone({
    //   setHeaders: {
    //     "Content-Type": "application/json",
    //     "Access-Control-Allow-Origin": "*",
    //     "Access-Control-Allow-Methods": "GET,POST,OPTIONS,DELETE,PUT",
    //     "Access-Control-Allow-Headers": "Content-Type"
    //   }
    // });
    // request.headers.append("Access-Control-Allow-Methods","GET,POST,OPTIONS,DELETE,PUT");
    // request.headers.append("Content-Type","application/json");
    return next.handle(request);
  }
}
