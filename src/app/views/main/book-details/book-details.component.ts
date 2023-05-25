import { Component, OnInit, ViewChild } from '@angular/core';
import { BookServicesService } from 'src/app/services/book-services.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { ChangeDetectionStrategy, Inject } from '@angular/core';
import { TuiDialogContext, TuiDialogService, TuiDialogSize } from '@taiga-ui/core';
import { PolymorpheusContent } from '@tinkoff/ng-polymorpheus';


@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent implements OnInit {

  allBooksTips: any[] = []
  getEmail: any
  email: any
  loading: boolean = false;
  open = false;
  open2 = false;
  index = 0;
  page: any;
  viewedBook: any
  Bookread: any
  bookDetailsList: any;
  isReadMore = true
  constructor(private bookServices: BookServicesService, private toastr: ToastrService, private route: ActivatedRoute, private router: Router, @Inject(TuiDialogService) private readonly dialogs: TuiDialogService) { }

  ngOnInit(): void {
    this.newBookDetails();
    this.recentlyViewed();
    this.readBook();
    this.carouselFunc();
    this.email = JSON.parse(localStorage.getItem('securityData') as string).user?.email
  }

  ngAfterViewInit() {
    // Hack: Scrolls to top of Page after page view initialized
    let top = document.getElementById('top');
    if (top !== null) {
      top.scrollIntoView();
      top = null;
    }
  }

  showText() {
    this.isReadMore = !this.isReadMore
  }
  bookLoading: boolean = false
  newBookDetails() {
    this.bookServices.getBooksDetails(this.route.snapshot.params['id']).subscribe((data) => {
      this.bookDetailsList = data;
    }, (err: any) => {
      console.log(err.error.message);
    })
  }
  booksTips(content: PolymorpheusContent<TuiDialogContext>,
    header: PolymorpheusContent,
    size: TuiDialogSize
  ) {
    this.bookLoading = true
    this.dialogs
      .open(content, {
        header,
        size,
      })
      .subscribe();
    this.bookServices.getBookTips(this.bookDetailsList.id).subscribe((data: any) => {
      this.allBooksTips = data.tips
      this.bookLoading = false
    }, (err: any) => {
      this.toastr.error(err.error.message);
      this.bookLoading = false
    })
  }
  emailInside() {
    this.loading = true;
    this.bookServices.getInside(this.bookDetailsList.id,
      {
        "email": this.email
      }
    ).subscribe((data: any) => {
      this.getEmail = data;
      this.toastr.success('You will recieve email shortly');
      this.loading = false;
      this.open2 = false;
    }, (error: any) => {
      console.log("something went wrong");
      this.loading = false;
    })
  }
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

  async moveToDeatils(id: any) {
    if (await this.router.navigateByUrl(`/main/book-details/${id}`)) {
      location.reload()
    }
  }
  async moveToDeatilsForRead(id: any) {
    if (await this.router.navigateByUrl(`/main/book-details/${id}`)) {
      location.reload()
    }
  }


  // end

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




  // for modal
  exampleForm = new FormGroup({
    exampleControl: new FormControl(''),
  });

  showDialog(): void {
    this.open = true;
  }
  showDialog2(): void {
    this.open2 = true;
  }

  readonly itemsCount = 2;
  //  for tips
  readonly = this.allBooksTips

  get rounded(): number {
    return Math.floor(this.index / this.itemsCount);
  }

  onIndex(index: number): void {
    this.index = index * this.itemsCount;
  }


}
