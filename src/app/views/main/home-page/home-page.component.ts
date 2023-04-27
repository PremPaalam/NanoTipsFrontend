import { Component, OnInit } from '@angular/core';
import { BookServicesService } from 'src/app/services/book-services.service';
import { DashboardService } from 'src/app/services/dashboard.service';


@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  books: any;
  search: any = ""
  user: any;
  userId: any;
  page:number = 1
  constructor(private bookServices: BookServicesService, private dasboardServices: DashboardService) { }

  ngOnInit(): void {
    this.userId = JSON.parse(localStorage.getItem('securityData') as string).user?.id
    this.carouselFunc();
    this.allBookList();
    this.getuser()
  }

  allBookList() {
    this.bookServices.getBooksList(this.search,this.page).subscribe((data: any) => {
      this.books = data.results
    })
  }
  // for user profile
  getuser() {
    this.dasboardServices.getUser(this.userId).subscribe((data: any) => {
      this.user = data;
    })
  }
  moveToBookList(){

  }
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


