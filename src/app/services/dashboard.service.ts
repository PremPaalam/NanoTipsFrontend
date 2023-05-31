import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

// let httpOptions = {
//   headers: new HttpHeaders({
//     'Content-Type': 'application/json',
//     'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('securityData') as string).tokens?.access.token
//   }),

// }
@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  baseUrl = 'https://api.nanoreads.io/'

  constructor(private http: HttpClient) { }

  getUser(userId: any) {
    return this.http.get(`${this.baseUrl}user/${userId}`, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('securityData') as string)?.tokens?.access.token
      })
    })
  }
  userUpdate(userId: any, uData: any) {
    return this.http.put<any>(`${this.baseUrl}user/${userId}`, uData, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('securityData') as string)?.tokens?.access.token
      })
    })
  }

  getCheckSubscription(userId: any) {
    return this.http.get(`${this.baseUrl}user/${userId}/check-subscription`, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('securityData') as string)?.tokens?.access.token
      })
    })
  }
  createCheckoutSession(userId: any, sData: any) {
    return this.http.post(`${this.baseUrl}user/${userId}/create-checkout-session`, sData, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('securityData') as string)?.tokens?.access.token
      })
    })
  }
  stripeCustomerPortal(userId: any, url: any) {
    return this.http.get(`${this.baseUrl}user/${userId}/stripe-customer-portal?returnUrl=${url}`, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('securityData') as string)?.tokens?.access.token
      })
    })
  }
}
