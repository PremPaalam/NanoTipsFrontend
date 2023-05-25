import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { DashboardLayoutComponent } from './dashboard-layout/dashboard-layout.component';
import { SubscriptionComponent } from './subscription/subscription.component';
import { ReadingHistoryComponent } from './reading-history/reading-history.component';
import { InvoicesComponent } from './invoices/invoices.component';

const routes: Routes = [
  {
    path: '', component: DashboardLayoutComponent,
    children:[
      { path: 'account-setting', component: AccountSettingsComponent },
      {path:'subscription', component: SubscriptionComponent},
      // {path:'reading-history', component: ReadingHistoryComponent},
      // {path:'invoices', component: InvoicesComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppDashboardRoutingModule { }
