import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ThanksPageComponent } from './thanks-page/thanks-page.component';

const routes: Routes = [
 {path:'thanks',component:ThanksPageComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
