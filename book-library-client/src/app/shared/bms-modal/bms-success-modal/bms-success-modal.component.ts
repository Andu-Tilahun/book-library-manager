import { Component, Input, OnInit  } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-bms-info-modal',
  templateUrl: './bms-success-modal.component.html',
  styleUrls: ['./bms-success-modal.component.scss'],
})
export class BmsSuccessModalComponent implements OnInit {
  @Input() modalTitle: string = '';
  @Input() modalMess: string = '';
  @Input() dismissBtnText: string = '';
  @Input() hideCloseButton = true;

  constructor(private activeModal: NgbActiveModal) {}
  ngOnInit(): void {
    // Automatically close the modal after 5 seconds
    setTimeout(() => {
      this.activeModal.close();
    }, 1000);
  }


}
