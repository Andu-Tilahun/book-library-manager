import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AbstractControl, FormGroup} from "@angular/forms";
import {Role, User, UserGender} from "@app/user-management/user/models/user.model";
import {FormlyFieldConfig} from "@ngx-formly/core";
import {map, Observable} from "rxjs";
import {take} from "rxjs/operators";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {UserService} from "@app/user-management/user/services/user.service";
import {TranslateService} from "@ngx-translate/core";
import {DomSanitizer} from "@angular/platform-browser";
import {ApiResponse} from "@model/response.model";
import {Router} from "@angular/router";
import {AuthService} from "@core/services/auth.service";

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.scss']
})

export class UserCreateComponent implements OnInit {

  @Output() modalClosed: EventEmitter<number> = new EventEmitter<number>()

  noOfRecords = 0;

  user$: Observable<User> = {} as Observable<User>;
  userId: any;

  roles: Role[] = [];
  form = new FormGroup({});
  model: User = {} as User;
  userFormData = new FormData();
  fields: FormlyFieldConfig[] = [
    {
      template: '<div class="mb-2"><strong>' + this.translate.instant('PAGES.USER_MANAGEMENT.USER.PERSONAL_INFORMATION') + '</strong></div><hr />',
    },
    {
      fieldGroupClassName: 'row',
      fieldGroup: [
        {
          className: 'col-4',
          key: 'firstName',
          type: 'input',
          props: {
            label: this.translate.instant('PAGES.USER_MANAGEMENT.USER.FIRSTNAME'),
            required: true,
          },
        },
        {
          className: 'col-4',
          key: 'middleName',
          type: 'input',
          props: {
            label: this.translate.instant('PAGES.USER_MANAGEMENT.USER.MIDDLENAME'),
            required: true,
          },
        },
        {
          className: 'col-4',
          key: 'lastName',
          type: 'input',
          props: {
            label: this.translate.instant('PAGES.USER_MANAGEMENT.USER.LASTNAME'),
            required: true,
          },
        },
      ],
    },
    {
      fieldGroupClassName: 'row',
      fieldGroup: [
        {
          className: 'col-4',
          key: 'gender',
          type: 'select',
          props: {
            label: this.translate.instant('PAGES.USER_MANAGEMENT.USER.GENDER'),
            required: true,
            options: [
              {label: 'Male', value: UserGender.MALE},
              {label: 'Female', value: UserGender.FEMALE}
            ],
          },

        },
        {
          className: 'col-4',
          key: 'email',
          type: 'input',
          props: {
            label: this.translate.instant('PAGES.USER_MANAGEMENT.USER.EMAIL'),
            required: true,
          },
        },
        {
          className: 'col-4',
          key: 'phoneNumber',
          type: 'input',
          props: {
            label: this.translate.instant('PAGES.USER_MANAGEMENT.USER.PHONENUMBER'),
            required: true,
          },
        },
      ],
    },

    {
      template: '<div class="mb-2"><strong>' + this.translate.instant('PAGES.USER_MANAGEMENT.USER.USER_ACCOUNT_INFORMATION') + '</strong></div><hr />',
    },
    {
      fieldGroupClassName: 'row',
      fieldGroup: [
        {
          className: 'col-6',
          key: 'userName',
          type: 'input',
          props: {
            label: this.translate.instant('PAGES.USER_MANAGEMENT.USER.USERNAME'),
            required: true,
          },
        },
        {
          className: 'col-6',
          key: 'password',
          type: 'input',
          props: {
            label: this.translate.instant('PAGES.USER_MANAGEMENT.USER.PASSWORD'),
            required: true,
            type: 'password',
          },
        },
        {
          className: 'col-4',
          key: 'role',
          type: 'select',
          props: {
            label: this.translate.instant('PAGES.USER_MANAGEMENT.USER.ROLES'),
            required: true,
            options: [
              {label: 'ADMIN', value: Role.ADMIN},
              {label: 'READER', value: Role.READER}
            ],
          },

        },
      ]
    }
  ];

  constructor(private activeModal: NgbActiveModal,
              private userService: UserService,
              private translate: TranslateService,
              private sanitizer: DomSanitizer,
              private router: Router,
              private authService: AuthService) {
  }


  ngOnInit(): void {
    this.user$ = this.authService.getLoggedInUser();
    this.user$.pipe().subscribe(user => {
      this.userId = user.id
    })
  }

  onSubmit() {

    if (this.form.valid) {
      this.userService.createUser(this.model)
        .pipe(
          take(1)
        ).subscribe((res) => {
        this.handleModalClose(res);
      });
    } else {
      console.log(JSON.stringify(this.model));
    }
  }

  handleModalClose(createUserResponse?: ApiResponse<void>) {
    if (createUserResponse) {
      this.activeModal.close(createUserResponse);
    }
    this.activeModal.close();
  }
}
