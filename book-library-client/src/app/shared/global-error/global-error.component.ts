import { Component, NgZone } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-global-error',
  templateUrl: './global-error.component.html',
  styleUrls: ['./global-error.component.scss'],
})
export class GlobalErrorComponent {
  constructor(private router: Router, private ngZone: NgZone) {}

  routeToDashboard() {
    this.ngZone.run(() => {
      this.router.navigateByUrl('/', { replaceUrl: true });
    });
  }
}
