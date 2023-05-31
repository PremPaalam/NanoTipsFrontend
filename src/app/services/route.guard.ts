
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RouteGuard implements CanActivate {

  constructor(private router: Router) { }

  canActivate() {
    if (JSON.parse(localStorage.getItem('securityData') as string) === null) {
      this.router.navigateByUrl('/.')
    } else if (JSON.parse(localStorage.getItem('securityData') as string)?.user) {
      this.router.navigateByUrl('/main/book-list')
    }
    return false
  }
}

