import {
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { AuthService } from '../services/auth.service';
import { environment } from '../../../environments/environment';
import {Observable, of} from 'rxjs';
import { filter, take } from 'rxjs/operators';
import { Endpoints } from '@core/models/endpoint.model';
import { SessionService } from '@core/services/session.service';
import { UpdateUserResponse, User } from '@app/user-management/user/models/user.model';
import {DomSanitizer, SafeResourceUrl} from "@angular/platform-browser";

import { TranslateService } from '@ngx-translate/core';
import {ActivatedRoute, Router} from "@angular/router";
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ApiResponse } from '@model/response.model';
import { Alert } from '@model/app-alert.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @ViewChild('logoutForm') private logoutForm: ElementRef | undefined;
  @Output() menuToggleButtonClicked = new EventEmitter();
  csrfToken$?: Observable<string>;
  logoutUrl = '';
  userDetails$?: Observable<User>;
  user: User = {} as User;
  userPicture$: Observable<SafeResourceUrl> | undefined;
  selectedLanguage: string = 'en'; // Default language
  successAlert: Alert | null = null;

  constructor(
    private authService: AuthService,
    private sessionService: SessionService,
    private domSanitizer: DomSanitizer,
    private translate: TranslateService,
    private router: Router,
    private route: ActivatedRoute,
    private modalService: NgbModal,
  ) {}

  ngOnInit() {

    // Retrieve the stored language from localStorage
    const storedLanguage = localStorage.getItem('selectedLanguage');
    if (storedLanguage) {
      this.selectedLanguage = storedLanguage;
      this.translate.use(storedLanguage); // Set the translation language
    } else {
      this.selectedLanguage = 'en'; // Default language
      this.translate.use('en'); // Set the translation language to default
    }

    this.logoutUrl = environment.baseUrl + Endpoints.LOGOUT;
    this.userDetails$ = this.authService.getLoggedInUser();
    this.csrfToken$ = this.authService.getCsrfToken$();



    this.sessionService.killSession$
      .pipe(
        take(1),
        filter(killSession => !!killSession),
      )
      .subscribe(() => {
        this.logout();
      });
  }

  logout(): void {
    this.authService.logout(this.logoutForm as ElementRef);
  }

  toggleSideMenu(event: any) {
    event.preventDefault();
    this.menuToggleButtonClicked.emit();
  }
  changeLanguage(language: string) {
    this.selectedLanguage = language;

    this.changeLanguage1(language); // Call the shared logic
  }

  changeLanguage1(languageCode: string) {
    // Change the current language based on the selected option
    this.translate.use(languageCode);

    // Store the selected language in localStorage
    localStorage.setItem('selectedLanguage', languageCode);
  }

  languageDisplayMap: { [key: string]: string } = {
    'en': 'En',
    'am-ET': 'Am',
  };



}
