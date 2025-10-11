import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, timer } from 'rxjs';
import { catchError, retryWhen, mergeMap, take } from 'rxjs/operators';

@Injectable()
export class RateLimitInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      retryWhen(errors =>
        errors.pipe(
          mergeMap((error, index) => {
            if (error instanceof HttpErrorResponse && error.status === 403) {
              const retryAttempt = index + 1;
              const maxRetries = 3;

              if (retryAttempt > maxRetries) {
                console.error('Máximo de reintentos alcanzado para:', req.url);
                return throwError(error);
              }

              const delayTime = 2000 * Math.pow(2, retryAttempt - 1);
              console.warn(`Rate limit detectado. Reintentando ${retryAttempt}/${maxRetries} en ${delayTime}ms`);
              return timer(delayTime);
            }
            return throwError(error);
          }),
          take(3)
        )
      ),
      catchError((error: HttpErrorResponse) => {
        if (error.status === 403) {
          console.error('Rate limit persistente. Considera usar un proxy alternativo o implementar cache.');
        }
        return throwError(error);
      })
    );
  }
}
