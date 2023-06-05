import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BookServicesService } from 'src/app/services/book-services.service';
import { DashboardService } from 'src/app/services/dashboard.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.css']
})
export class BooksListComponent implements OnInit {

  books: any[] = [];
  search: any = ""
  user: any;
  userId: any;
  page: number = 1
  subscriptions: any
  createCheckout: any;
  stripePortal: any;
  constructor(private bookServices: BookServicesService, private dasboardServices: DashboardService, private router: Router, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.allBookList();
    this.getuser();
    this.checkSubscription()

  }
  checkSubscription() {
    this.userId = JSON.parse(localStorage.getItem('securityData') as string).user?.id
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
            window.location.href = this.createCheckout.url
            this.getuser()
          })
        }

        if (this.subscriptions.actionRequired.UPDATE_SUBSCRIPTION == 1) {
          Swal.fire({
            title: 'Message!',
            text: 'This is some issue with your subscription payments. Please go to the customer portal and update your payment details',
            icon: 'error',
            confirmButtonText: 'Ok',
            willClose: () => {
              this.dasboardServices.stripeCustomerPortal(this.userId, "https://www.nanoreads.io").subscribe((data: any) => {
                this.stripePortal = data;
                console.log(this.stripePortal)
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
  hasNext: boolean = false
  allBookList() {
    if (this.search !== "") {
      this.bookServices.getBooksList(this.search, this.page).subscribe((data: any) => {
        let booksWithPageDetail: any[] = data.results.map((book: any) => ({
          book: book, page: this.page
        }))
        if (this.hasNext) {
          this.books = [...this.books, ...booksWithPageDetail]
        } else {
          this.books = [...booksWithPageDetail]

        }
        this.hasNext = data.page < data.totalPages
      }, (err: any) => {
        this.toastr.error(err.error.message);
      })
    } else {
      this.bookServices.getBooksList("", this.page).subscribe((data: any) => {
        let booksWithPageDetail: any[] = data.results.map((book: any) => ({ book: book, page: this.page }))
        this.books = [...this.books, ...booksWithPageDetail]
      }, (err: any) => {
        this.toastr.error(err.error.message);
      })
    }
  }
  loadMore() {
    this.page++
    console.log(this.page)
    this.allBookList()
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
