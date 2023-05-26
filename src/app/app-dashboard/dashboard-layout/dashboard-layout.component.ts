import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { BookServicesService } from 'src/app/services/book-services.service';

@Component({
  selector: 'app-dashboard-layout',
  templateUrl: './dashboard-layout.component.html',
  styleUrls: ['./dashboard-layout.component.css']
})
export class DashboardLayoutComponent implements OnInit {

  constructor(public router: Router, private bookServices: BookServicesService,) { }

  ngOnInit(): void {
    this.carouselFunc();
    this.recentlyViewed()
    this.readBook()
  }
  logout() {
    this.router.navigateByUrl('/accounts/login');
    localStorage.removeItem('securityData');
    localStorage.removeItem('securityData2');
  }

  viewedBook: any
  Bookread: any
  recentlyViewed() {
    this.bookServices.recentlyViewedBooks().subscribe((data) => {
      this.viewedBook = data.results;
    }, (err: any) => {
      console.log(err.error.message);
    })
  }


  readBook() {
    this.bookServices.bookRead().subscribe((data) => {
      this.Bookread = data;
    }, (err: any) => {
      console.log(err.error.message);
    })
  }


  ngAfterViewInit() {
    // Hack: Scrolls to top of Page after page view initialized
    let top = document.getElementById('top');
    if (top !== null) {
      top.scrollIntoView();
      top = null;
    }
  }
  // for carasouel
  carouselFunc() {
    const carousel = document.querySelectorAll("[class*=carousel-container]");
    carousel.forEach((carouselItem: any) => {
      const prev: any = document.querySelector(
        ".prev" +
        carouselItem.className
          .split(" ")
          .find((item: any) => item.match("carousel-container"))
          .split("carousel-container")[1]
      );

      const next: any = document.querySelector(
        ".next" +
        carouselItem.className
          .split(" ")
          .find((item: any) => item.match("carousel-container"))
          .split("carousel-container")[1]
      );
      console.log(next)

      const track: any = document.querySelector(
        ".track" +
        carouselItem.className
          .split(" ")
          .find((item: any) => item.match("carousel-container"))
          .split("carousel-container")[1]
      );

      let width = carouselItem.offsetWidth;
      let index = 0;
      window.addEventListener("resize", function () {
        width = carouselItem.offsetWidth;
      });
      next.addEventListener("click", function (e: any) {
        e.preventDefault();
        index = index + 1;
        prev.classList.add("show");
        track.style.transform = "translateX(" + index * -width + "px)";
        if (track.offsetWidth - index * width < index * width) {
          next.classList.add("hide");
        }
      });
      prev.addEventListener("click", function () {
        index = index - 1;
        next.classList.remove("hide");
        if (index === 0) {
          prev.classList.remove("show");
        }
        track.style.transform = "translateX(" + index * -width + "px)";
      });
    });
  }
}
