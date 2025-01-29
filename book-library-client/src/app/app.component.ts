import { Component, OnInit } from '@angular/core';
import { AuthService } from './core/services/auth.service';
import { Observable, tap } from 'rxjs';
import { NavigationEnd, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { SessionService } from '@core/services/session.service';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  isUserLoggedIn$?: Observable<boolean>;
  isCondensed = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private translate: TranslateService,
    private sessionService: SessionService,
  ) {
    this.router.events.forEach(event => {
      if (event instanceof NavigationEnd) {
        document.body.classList.remove('sidebar-enable');
      }
    });

    // translate.setDefaultLang('am-ET');
    // translate.use('am-ET');
    translate.setDefaultLang('en');
    translate.use('en');
  }

  ngOnInit() {
    this.setLayOutAttributes();
    this.isUserLoggedIn$ = this.authService.isUserLoggedIn$.pipe(
      filter(isLoggedIn => !!isLoggedIn),
      tap(() => {
        this.sessionService.init();
      }),
    );
  }

  onToggleMenu() {
    document.body.classList.toggle('sidebar-enable');
    const currentSidebarSize = document.body.getAttribute('data-sidebar-size');
    if (window.screen.width >= 992) {
      if (currentSidebarSize == null) {
        document.body.getAttribute('data-sidebar-size') == null ||
        document.body.getAttribute('data-sidebar-size') == 'lg'
          ? document.body.setAttribute('data-sidebar-size', 'sm')
          : document.body.setAttribute('data-sidebar-size', 'lg');
      } else if (currentSidebarSize == 'md') {
        document.body.getAttribute('data-sidebar-size') == 'md'
          ? document.body.setAttribute('data-sidebar-size', 'sm')
          : document.body.setAttribute('data-sidebar-size', 'md');
      } else {
        document.body.getAttribute('data-sidebar-size') == 'sm'
          ? document.body.setAttribute('data-sidebar-size', 'lg')
          : document.body.setAttribute('data-sidebar-size', 'sm');
      }
    }
    this.isCondensed = !this.isCondensed;
  }

  private setLayOutAttributes(): void {
    document.body.setAttribute('data-layout', 'vertical');
    document.body.setAttribute('data-topbar', 'light');
    document.body.setAttribute('data-sidebar', 'light');
    document.body.setAttribute('data-layout-mode', 'light');
    document.body.setAttribute('data-sidebar-size', 'lg');
    document.body.setAttribute('data-layout-scrollable', 'true');
    document.body.setAttribute('data-layout-size', 'fluid');
  }
}
