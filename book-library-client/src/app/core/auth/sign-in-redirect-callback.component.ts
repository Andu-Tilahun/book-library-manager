import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { filter, switchMap, take } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { User } from '@app/user-management/user/models/user.model';

@Component({
  template: `<div></div>`,
})
export class SignInRedirectCallbackComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.authService
      .isLoggedIn()
      .pipe(
        filter(loggedIn => !loggedIn),
        take(1),
        switchMap(() => this.activatedRoute.queryParams),
        filter(param => param && param['code'] && param['state']),
      )
      .subscribe(param => {
        const code = param['code'];
        const state = param['state'];
        this.authService.completeLogin(code, state);
      });
  }
}
