import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AccountsService } from 'src/app/services/accounts.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  password: string = '';
  loading: boolean = false;

  token: any;

  constructor(private accountServices: AccountsService, private router: Router, private toastr: ToastrService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: any) => {
      this.token = params.token
      console.log(params)

    })
  }

  resetPass() {
    this.loading = true;
    this.accountServices.resetPassword({
      "token": this.token,
      "password": this.password
    }).subscribe((data: any) => {
      this.toastr.success("Password changed successfully")
      this.loading = false;
      this.router.navigateByUrl('/accounts/login')

    }, err => {
      this.toastr.error(err.error.message)
      this.loading = false;
    })
  }
}
