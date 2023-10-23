import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService implements HttpInterceptor{
  public errorMessage: string = '';

  constructor(private router: Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          let errorMessage = this.handleError(error);
          return throwError(() => new Error(errorMessage));
        })
      );
  }

  public handleError = (error: HttpErrorResponse) : string => {
    if(error.status === 404){
      return this.handleNotFound(error);
    }
    else if(error.status === 400){
      return this.handleBadRequest(error);
    }else if(error.status === 401) {
      return this.handleUnauthorized(error);
    }else if(error.status === 403) {
      return this.handleUnauthorizedPermission(error);
    }
  }

  private handleNotFound = (error: HttpErrorResponse): string => {
    this.router.navigate(['/404']);
    return error.message;
  }

  private handleBadRequest = (error: HttpErrorResponse): string => {
    if(this.router.url === '/account/create' || 
    this.router.url.startsWith('/authentication/resetpassword')){
      let message = '';
      const values = Object.values<string[]>(error.error.errors);
      values.forEach(element => {
        message += element + '<br>';
      });
      return message.slice(0, -4);
    }
    else{
      return error.error ? error.error : error.message;
    }
  }

  private handleUnauthorized = (error: HttpErrorResponse) => {
    if(this.router.url === '/account/login') {
      return 'Authentication failed. Wrong Username or Password';
    }
    else {
      this.router.navigate(['/account/login'], { queryParams: { returnUrl: this.router.url }});
      return error.message;
    }
  }

  private handleUnauthorizedPermission = (error: HttpErrorResponse) => {
    this.router.navigate(['/403']);
    return error.message;
  }
}
