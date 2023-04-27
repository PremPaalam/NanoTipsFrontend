import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { HomePageComponent } from './home-page/home-page.component';
import { BookDetailsComponent } from './book-details/book-details.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TuiButtonModule, TuiDialogModule, TuiRootModule } from '@taiga-ui/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from "../layout/layout.module";
import { TuiCarouselModule, TuiIslandModule, TuiPaginationModule } from '@taiga-ui/kit';
import { BooksListComponent } from './books-list/books-list.component';


@NgModule({
    declarations: [
        HomePageComponent,
        BookDetailsComponent,
        BooksListComponent
    ],
    imports: [
        CommonModule,
        MainRoutingModule,
        ReactiveFormsModule,
        FormsModule,
        TuiDialogModule,
        LayoutModule,
        TuiPaginationModule,
        TuiCarouselModule,
        TuiButtonModule,
        TuiIslandModule
    ]
})
export class MainModule { }
