import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BookServicesService } from 'src/app/services/book-services.service';
import { DashboardService } from 'src/app/services/dashboard.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  books: any[] = [];
  search: any = ""
  user: any;
  userId: any;
  page: number = 1;
  subscriptions: any
  createCheckout: any;
  stripePortal: any;

  constructor(private bookServices: BookServicesService, private dasboardServices: DashboardService, private toastr: ToastrService, private router: Router) { }

  ngOnInit(): void {
    this.allBookList();
    if (JSON.parse(localStorage.getItem('securityData') as string) !== null) {
      this.getuser();
      this.checkSubscription();
    }
    this.carouselFunc();
  }

  allBookList() {
    this.bookServices.getBooksList(this.search, this.page).subscribe((data: any) => {
      let booksWithPageDetail: any[] = data.results.map((book: any) => ({ book: book, page: this.page }))
      this.books = booksWithPageDetail
    })
  }
  // for user profile
  getuser() {
    this.userId = JSON.parse(localStorage.getItem('securityData') as string)?.user?.id
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
  // for check sibscription
  checkSubscription() {
    this.userId = JSON.parse(localStorage.getItem('securityData') as string)?.user?.id
    this.dasboardServices.getCheckSubscription(this.userId).subscribe((data: any) => {
      this.subscriptions = data
      if (this.subscriptions.subscriptionActive == 0 || this.subscriptions.subscriptionActive == null) {
        if (this.subscriptions.actionRequired.CREATE_CHECKOUT_SESSION == 1) {
          // checkout session
          this.dasboardServices.createCheckoutSession(this.userId, {
            "successUrl": "https://nanoreads.io/main/book-list",
            "cancelUrl": "https://nanoreads.io/main/book-list"
          }).subscribe((data: any) => {
            this.createCheckout = data;
            window.location.href = this.createCheckout.url;
            this.getuser();
          })
        }

        if (this.subscriptions.actionRequired.UPDATE_SUBSCRIPTION == 1) {
          Swal.fire({
            title: 'Message!',
            text: 'This is some issue with your subscription payments. Please go to the customer portal and update your payment details',
            icon: 'success',
            confirmButtonText: 'Ok',
            willClose: () => {
              this.dasboardServices.stripeCustomerPortal(this.userId, "https://www.nanoreads.io").subscribe((data: any) => {
                this.stripePortal = data;
                window.location.href = this.stripePortal.url
              })
            }
          },)
        }

      }
    }, err => {
      this.toastr.error(err.error.message)
    })
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
