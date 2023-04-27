import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

let httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('securityData') as string).tokens?.access.token
  }),

}
@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  baseUrl = 'https://y830k6qf80.execute-api.eu-west-2.amazonaws.com/'

  constructor(private http: HttpClient) { }

  getUser(userId: any) {
    return this.http.get(`${this.baseUrl}user/${userId}`, httpOptions)
  }
  userUpdate(userId: any, uData: any) {
    return this.http.put<any>(`${this.baseUrl}user/${userId}`, uData, httpOptions)
  }

  getCheckSubscription(userId: any) {
    return this.http.get(`${this.baseUrl}user/${userId}/check-subscription`, httpOptions)
  }
  postSetupIntent(userId: any) {
    return this.http.post(`${this.baseUrl}user/${userId}/stripe/setup-intent`, {}, httpOptions)
  }
}
