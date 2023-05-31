import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutRoutingModule } from './layout-routing.module';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomePageComponent } from './home-page/home-page.component';
import { FormsModule } from '@angular/forms';
import { ThanksPageComponent } from './thanks-page/thanks-page.component';


@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    HomePageComponent,
    ThanksPageComponent
  ],
  imports: [
    CommonModule,
    LayoutRoutingModule,
    FormsModule
  ],
  exports: [HeaderComponent, FooterComponent],
})
export class LayoutModule { }
