import { Component } from '@angular/core';
import {FieldType} from "@ngx-formly/core";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-button',
  template: `
<!--    <label>{{'APP.GENERAL.ADDRESS.MAP_MESSAGE' | translate}}</label>&nbsp;&#58;-->
    <button type="button" class="map-button" (click)="onClick()"> <i class="fa fa-map-marker"></i> {{ to.label }}</button>
  `,
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent extends FieldType{

  onClick() {
    // @ts-ignore
    if (this.to.onClick) {

      // @ts-ignore
      this.to.onClick();
    }
  }
}
