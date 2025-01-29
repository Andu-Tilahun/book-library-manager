import { Component, OnDestroy, OnInit } from '@angular/core';
import { SpinnerService } from '../services/spinner.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss'],
})
export class SpinnerComponent implements OnInit, OnDestroy {
  showSpinner = false;
  private spinnerChangeSub: Subscription = {} as Subscription;

  constructor(private spinnerService: SpinnerService) {}

  ngOnInit() {
    this.spinnerChangeSub =
      this.spinnerService.spinnerVisibilityState.subscribe(value => {
        this.showSpinner = value;
      });
  }

  ngOnDestroy() {
    this.spinnerChangeSub.unsubscribe();
  }
}
