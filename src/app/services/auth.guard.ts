
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AccountsService } from './accounts.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private accountServices: AccountsService, private router: Router) { }


  canActivate() {
    if (this.accountServices.isLogin()) {
      return true;
    }
    this.router.navigateByUrl('/accounts/login')
    return false
  }
}

