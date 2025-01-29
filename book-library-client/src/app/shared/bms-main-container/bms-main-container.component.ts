import { Component, Input } from '@angular/core';

@Component({
  selector: 'bms-main-container',
  templateUrl: './bms-main-container.component.html',
  styleUrls: ['./bms-main-container.component.scss'],
})
export class BmsMainContainerComponent {
  @Input() title: string | undefined;

  @Input() totalSteps?: number;
  @Input() currentStep?: number;

  @Input() noCardContent = false;
}
