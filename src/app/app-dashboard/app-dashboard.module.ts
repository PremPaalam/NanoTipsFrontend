import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppDashboardRoutingModule } from './app-dashboard-routing.module';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { DashboardLayoutComponent } from './dashboard-layout/dashboard-layout.component';
import { LayoutModule } from "../views/layout/layout.module";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TuiButtonModule, TuiDialogModule } from '@taiga-ui/core';
import { SubscriptionComponent } from './subscription/subscription.component';
import { ReadingHistoryComponent } from './reading-history/reading-history.component';
import { InvoicesComponent } from './invoices/invoices.component';


@NgModule({
    declarations: [
        AccountSettingsComponent,
        DashboardLayoutComponent,
        SubscriptionComponent,
        ReadingHistoryComponent,
        InvoicesComponent
    ],
    imports: [
        CommonModule,
        AppDashboardRoutingModule,
        LayoutModule,
        ReactiveFormsModule,
        FormsModule,
        TuiDialogModule,
        TuiButtonModule,
    ]
})
export class AppDashboardModule { }
