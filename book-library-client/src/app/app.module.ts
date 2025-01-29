import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {CoreModule} from '@core/core.module';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {SharedModule} from './shared/shared.module';
import {BmsModalModule} from './shared/bms-modal/bms-modal.module';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {NgChartsModule} from "ng2-charts";
import {FormsModule,ReactiveFormsModule } from '@angular/forms';
import { BmsDataTableModule } from '@app/shared/bms-data-table/bms-data-table.module';
import {TreeTableModule} from "primeng/treetable";
@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    SharedModule,
    BmsModalModule,
    NgbModule,
    BrowserAnimationsModule,
    NgChartsModule,
    FormsModule,
    ReactiveFormsModule,
    BmsDataTableModule,
    TreeTableModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}


