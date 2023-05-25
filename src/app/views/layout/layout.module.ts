import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutRoutingModule } from './layout-routing.module';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomePageComponent } from './home-page/home-page.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    HomePageComponent
  ],
  imports: [
    CommonModule,
    LayoutRoutingModule,
    FormsModule
  ],
  exports: [HeaderComponent, FooterComponent],
})
export class LayoutModule { }
