import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BookServicesService {

  baseUrl = 'https://api.nanoreads.io/'
  constructor(private http: HttpClient) { }

  getBooksList(searchBook: any, page: number) {
    return this.http.get<any>(`${this.baseUrl}books/search?limit=10&page=${page}&sortBy=title:asc&title=${searchBook}`, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),

    })
  }
  getBooksDetails(bookId: any) {
    return this.http.get<any>(`${this.baseUrl}books/${bookId}`, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('securityData') as string).tokens?.access.token
      }),

    })
  }
  getBookTips(bookId: any) {
    return this.http.post<any>(`${this.baseUrl}books/${bookId}/tips`, {},
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('securityData') as string).tokens?.access.token
        }),

      }
    )
  }
  getInside(bookId: any, emailData: any) {
    return this.http.post<any>(`${this.baseUrl}books/${bookId}/insights`, emailData,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('securityData') as string).tokens?.access.token
        }),

      }
    )
  }
  recentlyViewedBooks(){
    return this.http.get<any>(`${this.baseUrl}books/recently-viewed`, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('securityData') as string).tokens?.access.token
      }),

    })
  }
  bookRead(){
    return this.http.get<any>(`${this.baseUrl}books/read`, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('securityData') as string).tokens?.access.token
      }),

    })
  }
}
