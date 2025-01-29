import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BmsModalComponent} from './bms-modal.component';
import {TranslateModule} from '@ngx-translate/core';
import {NgbActiveModal, NgbModalModule} from '@ng-bootstrap/ng-bootstrap';
import {BmsSuccessModalComponent} from "./bms-success-modal/bms-success-modal.component";
import {FormlyModule} from '@ngx-formly/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BmsInfoModalComponent} from "./bms-info-modal/bms-info-modal.component";

@NgModule({
  declarations: [BmsModalComponent, BmsSuccessModalComponent,BmsInfoModalComponent],
  exports: [BmsModalComponent,BmsInfoModalComponent],
  imports: [CommonModule, TranslateModule, NgbModalModule, FormlyModule, FormsModule, ReactiveFormsModule],
  providers: [NgbActiveModal],
})
export class BmsModalModule {
}
