import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookDetailsComponent } from './book-details/book-details.component';
import { BooksListComponent } from './books-list/books-list.component';
import { ThannksPageComponent } from './thannks-page/thannks-page.component';

const routes: Routes = [
  {path:'book-details/:id',component:BookDetailsComponent},
  {path:'book-list',component: BooksListComponent},
  {path:'thanks',component:ThannksPageComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
