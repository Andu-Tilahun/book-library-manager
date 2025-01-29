import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  template: `<div></div>`,
})
export class SignOutRedirectCallbackComponent implements OnInit {
  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.completeLogout();
  }
}
