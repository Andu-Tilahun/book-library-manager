import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Alert } from '@model/app-alert.model';

@Component({
  selector: 'app-bms-modal',
  templateUrl: './bms-modal.component.html',
  styleUrls: ['./bms-modal.component.scss'],
})
export class BmsModalComponent {
  @Input() modalTitle?: string;
  @Input() hideCloseButton = false;
  @Input() backButton?: boolean;
  @Input() pageAlert: Alert = {
    type:'success',
    message:'',
  };

  @Output() modalClosed: EventEmitter<void> = new EventEmitter<void>();

  constructor() {}

  closeModal() {
    this.modalClosed.emit();
  }
}
