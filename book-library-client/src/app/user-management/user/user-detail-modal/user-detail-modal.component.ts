import { Component, OnInit } from '@angular/core';
import {User} from '@app/user-management/user/models/user.model';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-user-detail-modal',
  templateUrl: './user-detail-modal.component.html',
  styleUrls: ['./user-detail-modal.component.scss'],
})
export class UserDetailModalComponent implements OnInit {
  user: User = {} as User;

  userPicture$: Observable<SafeResourceUrl> | undefined;
  userSignature$: Observable<SafeResourceUrl> | undefined;
  userSignatureStamp$: Observable<SafeResourceUrl> | undefined;

  constructor(
    private activeModal: NgbActiveModal,
    private domSanitizer: DomSanitizer,
  ) {}

  handleModalClose() {
    this.activeModal.close();
  }

  ngOnInit(): void {

  }
}
