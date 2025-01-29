import { Component, OnInit } from '@angular/core';
import {forkJoin, map, Observable, of} from 'rxjs';
import {
  CreateUserResponse,
  SearchUserResponse,
  UpdateUserResponse,
  User,
} from '@app/user-management/user/models/user.model';
import { DataTableColumn } from '@model/data-table.model';
import { UserService } from '@app/user-management/user/services/user.service';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { UserCreateComponent } from '@app/user-management/user/user-create/user-create.component';
import { UserDetailModalComponent } from '@app/user-management/user/user-detail-modal/user-detail-modal.component';
import {catchError, filter, switchMap, take} from 'rxjs/operators';
import { AuthService } from '@core/services/auth.service';
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit {
  successAlert: Alert | null = null;

  userDetails$?: Observable<User>;

  email: string = "";

  readonly dataTableColumns: DataTableColumn<User>[] = [
    {
      header: 'PAGES.USER_MANAGEMENT.USER.FIRSTNAME',
      columnReference: 'firstName',
    },
    {
      header: 'PAGES.USER_MANAGEMENT.USER.MIDDLENAME',
      columnReference: 'middleName',
    },
    {
      header: 'PAGES.USER_MANAGEMENT.USER.LASTNAME',
      columnReference: 'lastName',
    },
    {
      header: 'PAGES.USER_MANAGEMENT.USER.GENDER',
      columnReference: 'gender',
    },
    {
      header: 'PAGES.USER_MANAGEMENT.USER.EMAIL',
      columnReference: 'email',
    },
    {
      header: 'PAGES.USER_MANAGEMENT.USER.PHONENUMBER',
      columnReference: 'phoneNumber',
    },
  ];



  fileName="User Data";
  documentName="User Data";

  users$?: Observable<Array<User>>;

  constructor(
    public userService: UserService,
    private modalService: NgbModal,
    private authService: AuthService,
    private translateService: TranslateService
  ) {}

  ngOnInit(): void {
    this.userDetails$ = this.authService.getLoggedInUser();
    this.fetchUsers();
  }

  onNewUserClick() {
    const modalRef: NgbModalRef = this.modalService.open(UserCreateComponent, {
      size: 'xl',
      backdrop: 'static',
    });

    modalRef.result.then((data: CreateUserResponse) => {
      if (data) {
        this.successAlert = {
          type: 'success',
          message: 'PAGES.USER_MANAGEMENT.USER.MESSAGE.SUCCESS.CREATE',
        };
        this.fetchUsers();
        setTimeout(() => {
          this.successAlert = null;
        }, 2000);
      }
    });

  }

  onDetailUserClick(user: User) {
    const modalRef: NgbModalRef = this.modalService.open(
      UserDetailModalComponent
    );
    modalRef.componentInstance.user = user;
  }




  private fetchUsers(): void {
    this.users$ = this.userService.fetchAllUser().pipe(
      filter((response: SearchUserResponse) => !!response?.data),
      switchMap((response: SearchUserResponse) => {
        const users = response.data as Array<User>;

        // Map each user to an observable that includes its user data
        const userWithUsers$ = users.map((user) => {
          const createdBy$ = user.createdBy
            ? this.userService.getUserById(user.createdBy).pipe(
              map((user) => `${user.firstName} ${user.middleName || ''} ${user.lastName}`.trim()),
              catchError(() => of('Error Fetching User')) // Fallback for API errors
            )
            : of(''); // Fallback for undefined createdBy

          const modifiedBy$ = user.modifiedBy
            ? this.userService.getUserById(user.modifiedBy).pipe(
              map((user) => `${user.firstName} ${user.middleName || ''} ${user.lastName}`.trim()),
              catchError(() => of('Error Fetching User')) // Fallback for API errors
            )
            : of(''); // Fallback for undefined modifiedBy

          // Combine both observables and map them to the user
          return forkJoin([createdBy$, modifiedBy$]).pipe(
            map(([createdBy, modifiedBy]) => ({
              ...user,
              createdDate: user.createdDate != null? this.formatDate(user.createdDate) : '',
              createdBy,
              modifiedDate: user.modifiedDate != null? this.formatDate(user.modifiedDate) : '',
              modifiedBy,
            }))
          );
        });

        // Combine all user observables into a single observable
        return forkJoin(userWithUsers$);
      })
    );
  }

  private formatDate(date: Date | string): string {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'short',
      day: '2-digit',
    };
    return new Date(date).toLocaleDateString('en-US', options); // Adjust locale and format as needed
  }

  onUserInput(event: any): void {
    this.email = event.target.value;

    // @ts-ignore
    this.users$ = this.users$.pipe(
      map((users: User[]) => this.filterUsers(users)),
    );
  }

  private filterUsers(users: User[]): User[] {
    if (!this.email || this.email.trim() === '') {
      return users;
    }
    const searchTerm = this.email.toLowerCase().trim();
    return users.filter(user => user.email.toLowerCase().includes(searchTerm));
  }
}
export interface Alert {
  type: string;
  message: string;
}
