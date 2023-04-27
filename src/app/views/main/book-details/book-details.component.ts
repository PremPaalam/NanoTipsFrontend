import { Component, OnInit, ViewChild } from '@angular/core';
import { BookServicesService } from 'src/app/services/book-services.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent implements OnInit {

  allBooksTips: any[] = []
  details: any
  getEmail: any
  email = ''
  loading: boolean = false;
  open = false;
  open2 = false;
  index = 0;
  page:number = 1
  constructor(private bookServices: BookServicesService, private toastr: ToastrService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.bookDeatils();
  }

  bookDeatils() {
    this.bookServices.getBooksList(this.route.snapshot.params['id'],this.page).subscribe(
      data => {
        this.details = data.results.filter((item: any) => {
          return item.id === this.route.snapshot.params['id'];
        })[0]
      },
      (err) => {
        console.log('something went wrong');
      }
    );
  }

  booksTips() {
    this.open = true
    this.bookServices.getBookTips(
      {
        "title": `${this.details.title} by ${this.details.authors.name}`
      },
    ).subscribe((data: any) => {
      this.allBooksTips = data.tips
      console.log(this.allBooksTips);
    }, (eror: any) => {
      console.log("something went wrong", eror);
    })
  }
  emailInside() {
    this.loading = true;
    this.bookServices.getInside(
      {
        "title": `${this.details.title} by ${this.details.authors.name}`,
        "email": this.email
      }
    ).subscribe((data: any) => {
      this.getEmail = data;
      this.toastr.success('You will recieve email shortly');
      this.loading = false;
      document.getElementById('close')?.click()
    }, (error: any) => {
      console.log("something went wrong");
      this.loading = false;
    })
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
  readonly =  this.allBooksTips

  get rounded(): number {
    return Math.floor(this.index / this.itemsCount);
  }

  onIndex(index: number): void {
    this.index = index * this.itemsCount;
  }


}
