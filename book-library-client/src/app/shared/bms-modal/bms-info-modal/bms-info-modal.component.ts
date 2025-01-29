import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-bms-info-modal',
  templateUrl: './bms-info-modal.component.html',
  styleUrls: ['./bms-info-modal.component.scss'],
})
export class BmsInfoModalComponent {
  @Input() modalTitle: string = '';
  @Input() modalMessage: string = '';
  @Input() dismissBtnText: string = '';
  @Input() hideCloseButton = true;

  constructor(private activeModal: NgbActiveModal) {}

  closeModal() {
    this.activeModal.close(true);
  }
}
