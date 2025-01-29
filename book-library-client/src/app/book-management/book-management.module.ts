import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BookManagementRoutingModule } from './book-management-routing.module';
import { BookListComponent } from './book-list/book-list.component';
import {BmsDataTableModule} from "@app/shared/bms-data-table/bms-data-table.module";
import {SharedModule} from "@app/shared/shared.module";
import { CreateBookComponent } from './create-book/create-book.component';
import { BookSearchComponent } from './book-search/book-search.component';
import {FormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    BookListComponent,
    CreateBookComponent,
    BookSearchComponent
  ],
    imports: [
        CommonModule,
        BookManagementRoutingModule,
        BmsDataTableModule,
        SharedModule,
        FormsModule
    ]
})
export class BookManagementModule { }
