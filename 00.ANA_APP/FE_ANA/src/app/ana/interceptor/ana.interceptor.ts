import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, Observable, switchMap, throwError } from 'rxjs';
import { anaService } from '../services/ana.service';

@Injectable()
export class AnaInterceptor implements HttpInterceptor {

  refresh = false;

  constructor(
    private anaService: anaService
    ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const req = request.clone({
      setHeaders: {
        Authorization: `Bearer ${this.anaService.accessToken}`
      }
    });

    return next.handle(req).pipe(catchError((err: HttpErrorResponse)=>{
      if(err.status === 403  && !this.refresh ) {
        this.refresh = true
        return this.anaService.refresh().pipe(
          switchMap( (res: any) => {
            this.anaService.accessToken = res.token;
            return next.handle(request.clone({
              setHeaders: {
                Authorization: `Bearer ${this.anaService.accessToken}`
              }
            }));
          })
        );
      }
      this.refresh = false
      return throwError(()=>err);
    }));
  }
}
