import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './services/auth.guard';
import { HomePageComponent } from './views/layout/home-page/home-page.component';
import { RouteGuard } from './services/route.guard';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: HomePageComponent, canActivate: [RouteGuard] },

  { path: '.', component: HomePageComponent },
  { path: 'accounts', loadChildren: () => import('./accounts/accounts.module').then(m => m.AccountsModule) },
  { path: 'layout', loadChildren: () => import('./views/layout/layout.module').then(m => m.LayoutModule) },
  { path: 'main', loadChildren: () => import('./views/main/main.module').then(m => m.MainModule), canActivate: [AuthGuard] },
  { path: 'app-dashboard', loadChildren: () => import('./app-dashboard/app-dashboard.module').then(m => m.AppDashboardModule), canActivate: [AuthGuard] },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
