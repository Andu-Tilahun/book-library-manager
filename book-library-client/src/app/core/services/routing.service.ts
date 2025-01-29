import { Injectable } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {map, Observable} from 'rxjs';
import {take} from 'rxjs/operators';

@Injectable()
export class RoutingService {

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute) { }

  navigateByUrl(url: string) {
    this.router.navigateByUrl(url)
      .then();
  }

  getRouteParamValue(paramName: string): Observable<string | undefined> {
    return this.activatedRoute.params
      .pipe(
        take(1),
        map((params) => params[`'${paramName}'`] || undefined),
      );
  }

  private routeParam(paramName: string): string | undefined {
    return this.activatedRoute.snapshot.params[paramName] as string || undefined;
  }

}
