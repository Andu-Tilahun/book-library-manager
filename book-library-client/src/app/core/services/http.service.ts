import {Injectable} from '@angular/core';
import {Observable, of, switchMap, throwError} from 'rxjs';
import {
  HttpClient,
  HttpContext,
  HttpContextToken,
  HttpErrorResponse,
  HttpHeaders,
  HttpParams,
} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {catchError, take} from 'rxjs/operators';
import {HttpStatus} from '../models/http.model';
import {Endpoints} from "@core/models/endpoint.model";

export enum RequestType {
  BLOCKING, // Show spinner and handle error globally (default)
  NON_BLOCKING, // Don't show spinner and ignore any error
  LOCAL, // Show spinner and handle error locally (component level)
}

export interface RequestOption {
  requestType: RequestType;
}

const defaultRequestOption: RequestOption = {
  requestType: RequestType.BLOCKING,
};

export const REQUEST_TYPE = new HttpContextToken(() => RequestType.BLOCKING);

@Injectable()
export class HttpService {
  constructor(private http: HttpClient) {
  }

  get<T>(url: string, xxx?: HttpHeaders, params?: HttpParams | { [key: string]: string | number | boolean },
         requestOptions?: RequestOption): Observable<T> {
    const apiUrl = this.getApiUrl(url);

    const httpParams =
      params instanceof HttpParams
        ? params
        : new HttpParams({fromObject: params || {}});

    return this.prepareRequestOption(requestOptions).pipe(
      take(1),
      switchMap(httpContext =>
        this.http
          .get<T>(apiUrl, {
            headers: xxx,
            context: httpContext,
            params: httpParams,

          })
          .pipe(
            catchError(error => {
              return this.handleErrorResponse(error, httpContext);
            }),
          ),
      ),
    );
  }

  post<T>(
    url: string,
    body: any,
    requestOptions?: RequestOption,
  ): Observable<T> {
    const apiUrl = this.getApiUrl(url);
    return this.prepareRequestOption(requestOptions).pipe(
      take(1),
      switchMap(httpContext =>
        this.http
          .post<T>(apiUrl, body, {
            context: httpContext,
            headers: body instanceof FormData ? undefined : {'Content-Type': 'application/json'},
          })
          .pipe(
            catchError(error => {
              return this.handleErrorResponse(error, httpContext);
            }),
          ),
      ),
    );
  }

  put<T>(
    url: string,
    body: any,
    requestOptions?: RequestOption,
  ): Observable<T> {
    const apiUrl = this.getApiUrl(url);

    return this.prepareRequestOption(requestOptions).pipe(
      take(1),
      switchMap(httpContext =>
        this.http
          .put<T>(apiUrl, body, {
            context: httpContext,
          })
          .pipe(
            catchError(error => {
              return this.handleErrorResponse(error, httpContext);
            }),
          ),
      ),
    );
  }

  delete<T>(url: string, requestOptions?: RequestOption): Observable<T> {
    const apiUrl = this.getApiUrl(url);
    return this.prepareRequestOption(requestOptions).pipe(
      take(1),
      switchMap(httpContext =>
        this.http
          .delete<T>(apiUrl, {
            context: httpContext,
          })
          .pipe(
            catchError(error => {
              return this.handleErrorResponse(error, httpContext);
            }),
          ),
      ),
    );
  }

  private prepareRequestOption(
    requestOption: RequestOption = defaultRequestOption,
  ): Observable<HttpContext> {
    const httpContext: HttpContext = new HttpContext();
    if (requestOption.requestType !== RequestType.BLOCKING) {
      httpContext.set(REQUEST_TYPE, requestOption.requestType);
    }
    return of(httpContext);
  }

  private getApiUrl(url: string): string {
    return `${environment.cmsGateWayRootContext}${url}`;
  }


  private handleErrorResponse(
    error: HttpErrorResponse | any,
    httpContext: HttpContext,
  ) {
    if (error && error instanceof HttpErrorResponse) {
      switch (error.status) {
        case HttpStatus.UNAUTHORIZED:
          return throwError(() => error);
         // this.redirectToLogin();
         // return of(error?.error);
        // case HttpStatus.FORBIDDEN:
        //   this.redirectToLogin();
        //   return of({});
        case HttpStatus.UNPROCESSED_ENTITY:
        case HttpStatus.BAD_REQUEST:
          return of(error?.error);
        default:
          if (this.handleErrorLocally(httpContext)) {
            return of(error?.error);
          } else {
            return throwError(() => error);
          }
      }
    }
    return throwError(() => error);
  }

  private handleErrorLocally(httpContext: HttpContext): boolean {
    const requestType = httpContext.get(REQUEST_TYPE);
    return requestType === RequestType.LOCAL;
  }

  private redirectToLogin() {
    window.open(environment.baseUrl + Endpoints.USER_AUTHORIZATION, '_self');
  }
}
