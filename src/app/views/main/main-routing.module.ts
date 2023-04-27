import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookDetailsComponent } from './book-details/book-details.component';
import { HomePageComponent } from './home-page/home-page.component';
import { BooksListComponent } from './books-list/books-list.component';

const routes: Routes = [
  { path: 'home', component: HomePageComponent},
  {path:'book-details/:id',component:BookDetailsComponent},
  {path:'book-list',component: BooksListComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }