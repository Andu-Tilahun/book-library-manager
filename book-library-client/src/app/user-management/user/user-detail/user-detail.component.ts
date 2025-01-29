import { Component, Input } from '@angular/core';
import { User } from '../models/user.model';
import { SafeResourceUrl } from '@angular/platform-browser';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss'],
})
export class UserDetailComponent {
@Input()
user: User = {} as User;

@Input()
userPicture$: Observable<SafeResourceUrl> | undefined;

@Input()
userSignature$: Observable<SafeResourceUrl> | undefined;

@Input()
userSignatureStamp$: Observable<SafeResourceUrl> | undefined;

}
