import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoaderHttpService } from '../services/utils/loader-http.service';
import { finalize } from 'rxjs/operators';

@Injectable()
export class LoaderInterceptorInterceptor implements HttpInterceptor {

  constructor(private spinnerService: LoaderHttpService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.spinnerService.showSpinner();
    return next.handle(request).pipe(
      finalize( () => {
        this.spinnerService.hideSpinner();
      })
    )
  }
}
