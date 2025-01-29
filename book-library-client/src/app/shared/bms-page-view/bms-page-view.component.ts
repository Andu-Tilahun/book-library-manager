import { Component, Input } from '@angular/core';
import { Alert, AlertType } from '../models/app-alert.model';
import { Location } from '@angular/common';

@Component({
  selector: 'app-bms-page-view',
  templateUrl: './bms-page-view.component.html',
  styleUrls: ['./bms-page-view.component.scss'],
})
export class BmsPageViewComponent {
  constructor(private location: Location) {
  }
  readonly warningAlertType: AlertType = AlertType.DANGER;

  @Input() pageTitle: string | undefined;
  @Input() subTitle: string | undefined;
  @Input() noCardContent = false;

  @Input() totalSteps?: number;
  @Input() currentStep?: number;
  @Input() backButton?: boolean;

  @Input() pageAlert: Alert | null = null;

  goBack(): void {
    // this.router.navigate(['..']);
    this.location.back();

  }
  onAlertClose() {
    this.pageAlert = null;
  }
}
