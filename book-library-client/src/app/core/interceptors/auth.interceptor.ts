import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { finalize, Observable } from 'rxjs';
import { v1 as uuid } from 'uuid';
import { CustomHttpHeaders } from '../models/request-headers.model';
import { SpinnerService } from '../services/spinner.service';
import { REQUEST_TYPE, RequestType } from '../services/http.service';
import { SessionService } from '@core/services/session.service';
import { Endpoints } from '@core/models/endpoint.model';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private authService: AuthService,
    private spinnerService: SpinnerService,
    private sessionService: SessionService,
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    const clonedReq = this.setHeaders(req);
    const isBlocking = this.isBlockingRequest(req);

    if (isBlocking) {
      this.spinnerService.incrementRequestCounter();
    }

    return next.handle(clonedReq).pipe(
      finalize(() => {
        if (isBlocking) {
          this.spinnerService.decrementRequestCounter();
        }

        //Set last interaction time for each api requests other than keep alive
        if (!req.url.endsWith(Endpoints.KEEP_ALIVE_USER_SESSION)) {
          this.sessionService.setLastInteractionTime();
        }
      }),
    );
  }

  private setHeaders(req: HttpRequest<any>): HttpRequest<any> {
    const headers = new HttpHeaders()
      .set(CustomHttpHeaders.CORRELATION_ID, this.generateCorrelationId())
      .set(CustomHttpHeaders.CSRF_HEADER, this.authService.getCsrfToken());

    return req.clone({ headers: headers, withCredentials: true });
  }

  private isBlockingRequest(req: HttpRequest<any>): boolean {
    const requestType = req.context.get(REQUEST_TYPE);
    return requestType !== RequestType.NON_BLOCKING;
  }

  private generateCorrelationId(): string {
    return uuid();
  }
}
