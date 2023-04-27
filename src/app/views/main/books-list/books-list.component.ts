import { Component, OnInit } from '@angular/core';
import { BookServicesService } from 'src/app/services/book-services.service';
import { DashboardService } from 'src/app/services/dashboard.service';

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

  constructor(private bookServices: BookServicesService, private dasboardServices: DashboardService) { }

  ngOnInit(): void {
    this.userId = JSON.parse(localStorage.getItem('securityData') as string).user?.id
    this.allBookList();
    this.getuser()
  }
  allBookList() {
    this.bookServices.getBooksList(this.search, this.page).subscribe((data: any) => {
      this.books = [...this.books, ...data.results]
    })
  }
  loadMore() {
    this.page++
    console.log(this.page)
    this.allBookList()
  }
  // for user profile
  getuser() {
    this.dasboardServices.getUser(this.userId).subscribe((data: any) => {
      this.user = data;
    })
  }
}
