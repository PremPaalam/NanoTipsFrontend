import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { DashboardService } from 'src/app/services/dashboard.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  user: any;
  userId: any
  constructor( private dasboardServices: DashboardService,private router: Router) { }

  ngOnInit(): void {
    this.mobileToggleNav()
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
  }
  mobileToggleNav() {
    let hamMenuIcon: any = document.getElementById("ham-menu");
    let navBar: any = document.getElementById("nav-bar");
    let navLinks = navBar.querySelectorAll("li");

    hamMenuIcon.addEventListener("click", () => {
      navBar.classList.toggle("active");
      if (hamMenuIcon.classList.contains("fa-bars")) {
        hamMenuIcon.classList.remove("fa-bars");
        hamMenuIcon.classList.add("fa-times");
      } else {
        hamMenuIcon.classList.add("fa-bars");
        hamMenuIcon.classList.remove("fa-times");
      }

    });
    navLinks.forEach((navLinks: any) => {
      navLinks.addEventListener("click", () => {
        navBar.classList.remove("active");
        hamMenuIcon.classList.toggle("fa-times");
        hamMenuIcon.classList.toggle("fa-bars");
      });
    });
  }
}
