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
  userId: any;
  stripePortal: any;
  loading: boolean = false
  returnUrl = "https://nanoreads.io/app-dashboard/subscription"

  user:any

  constructor(private dashboardServices: DashboardService, private toastr: ToastrService) { }

  ngOnInit(): void {

  }
  getuser() {
    this.userId = JSON.parse(localStorage.getItem('securityData') as string).user?.id
    this.dashboardServices.getUser(this.userId).subscribe((data: any) => {
      this.user = data;
      console.log(this.user)
    })
  }
  stripeCustomer() {
    this.userId = JSON.parse(localStorage.getItem('securityData') as string).user?.id
    this.loading = true;
    this.dashboardServices.stripeCustomerPortal(this.userId, this.returnUrl).subscribe((data) => {
      this.stripePortal = data;
      window.location.href = this.stripePortal.url
      this.loading = false;
      this.getuser()
    }, err => {
      this.toastr.error(err.error.message);
      this.loading = false;
    })
  }
  showPricingDiv() {
    this.pricing = !this.pricing;
    this.subscriptionDetails = !this.subscriptionDetails
  }
}
