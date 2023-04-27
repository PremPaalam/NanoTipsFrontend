import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BookServicesService {

  baseUrl = 'https://y830k6qf80.execute-api.eu-west-2.amazonaws.com/'
  constructor(private http: HttpClient) { }

  getBooksList(searchBook: any,page:number) {
    return this.http.get<any>(`${this.baseUrl}books/search?limit=10&page=${page}&sortBy=title:${searchBook}`, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),

    })
  }
  getBookTips(tData: any) {
    return this.http.post<any>(`${this.baseUrl}openai/book-tips`, tData,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),

      }
    )
  }
  getInside(emailData: any) {
    return this.http.post<any>(`${this.baseUrl}openai/book-insights`, emailData,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),

      }
    )
  }
}
