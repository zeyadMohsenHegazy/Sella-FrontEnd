import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { JWTService } from '../Services/jwt.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Injectable()
export class TokenInterceptorInterceptor implements HttpInterceptor {
  constructor(
    private auth: JWTService,
    private Toast: ToastrService,
    private route: Router
  ) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const Token = this.auth.GetToken();

    if (Token) {
      request = request.clone({
        setHeaders: { Authorization: `Bearer ${Token}` },
      });
    }
    return next.handle(request).pipe(
      catchError((err) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status == 401) {
            this.Toast.warning('Seasion is expired .. Please Log in Again');
            this.route.navigate(['login']);
          }
        }
        return throwError(() => new Error('Somethige Went Wrong !'));
      })
    );
  }
}
