import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { DashboardService } from 'src/app/services/dashboard.service';

@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.css']
})
export class SubscriptionComponent implements OnInit {

  pricing: boolean = false;
  subscriptionDetails: boolean = true;
  userId: any
  subscriptions: any

  constructor(private dashboardServices: DashboardService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.userId = JSON.parse(localStorage.getItem('securityData') as string).user?.id
    this.checkSubscription()
    
  }

  checkSubscription() {
    this.dashboardServices.getCheckSubscription(this.userId).subscribe((data: any) => {
      this.subscriptions = data
      console.log(this.subscriptions)
    }, err => {
      this.toastr.error(err.error.message)
    })
  }
  setupIntent(){
    this.dashboardServices.postSetupIntent(this.userId).subscribe((data: any) => {
      this.subscriptions = data
      console.log(this.subscriptions)
    }, err => {
      this.toastr.error(err.error.message)
    })
  }
  showPricingDiv() {
    this.pricing = !this.pricing;
    this.subscriptionDetails = !this.subscriptionDetails
  }
}
