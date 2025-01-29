import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-custom-alert',
  templateUrl: './custom-alert.component.html',
  styleUrls: ['./custom-alert.component.scss'],

})
export class CustomAlertComponent {
  @Input() title: string = '';
  @Input() message: string = '';
  @Output() closed = new EventEmitter<void>();

  onCloseClick() {
    this.closed.emit();
  }
}
