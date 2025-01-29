import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {BookListComponent} from "@app/book-management/book-list/book-list.component";
import {CreateBookComponent} from "@app/book-management/create-book/create-book.component";

const routes: Routes = [
  {
    path: '',
    component: BookListComponent,
  },
  {
    path: 'create',
    component: CreateBookComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BookManagementRoutingModule {
}
