import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DashboardService } from 'src/app/services/dashboard.service';

@Component({
  selector: 'app-main-header',
  templateUrl: './main-header.component.html',
  styleUrls: ['./main-header.component.css']
})
export class MainHeaderComponent implements OnInit {

  user: any;
  userId: any;
  constructor(private dasboardServices: DashboardService, private router: Router) { }

  ngOnInit(): void {
    this.getuser()
  }
  // for user profile
  getuser() {
    this.userId = JSON.parse(localStorage.getItem('securityData') as string).user?.id
    this.dasboardServices.getUser(this.userId).subscribe((data: any) => {
      this.user = data;
    })
  }
  logout() {
    this.router.navigateByUrl('/accounts/login');
    localStorage.removeItem('securityData');
    localStorage.removeItem('securityData2');
    localStorage.removeItem('user');
  }
}
