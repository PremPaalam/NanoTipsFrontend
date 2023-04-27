import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountsService {

  baseUrl = 'https://y830k6qf80.execute-api.eu-west-2.amazonaws.com/'

  constructor(private http: HttpClient) { }

  rigster(data: any) {
    return this.http.post<any>(`${this.baseUrl}auth/register`, data, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),

    })
  }

  loginIn(Ldata: any) {
    return this.http.post(`${this.baseUrl}auth/login`, Ldata, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    }).pipe(tap((res: any) => {
      localStorage.setItem('securityData', JSON.stringify(res));
    }))
  }
  forgotPassword(rData: any) {
    return this.http.post(`${this.baseUrl}auth/forgot-password`, rData, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),

    })
  }
  resetPassword(rData: any) {
    return this.http.post(`${this.baseUrl}auth/reset-password`, rData, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),

    })
  }
  updatePassword(userId: any, rData: any) {
    return this.http.put(`${this.baseUrl}user/${userId}/password`, rData, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('securityData') as string).tokens?.access.token
      }),

    })
  }
  profileImage(userId: any,image: File) {
    const endpoint = `${this.baseUrl}user/${userId}/photo`;
    let formData = new FormData();
    formData.append('image', image, image.name);

    return this.http.put(endpoint, formData, {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('securityData') as string).tokens?.access.token
      }),

    })
  }
}
