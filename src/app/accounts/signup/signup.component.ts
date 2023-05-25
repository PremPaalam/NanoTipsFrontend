import { Component, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LogInDto, SignInDto } from 'src/app/modal/security.modal';
import { AccountsService } from 'src/app/services/accounts.service';
import { DashboardService } from 'src/app/services/dashboard.service';
import { ConfirmedValidator } from '../confirm-password-valid/confirm-password-validators';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  open = false;
  signupObj = new SignInDto();
  loginObj = new LogInDto();
  // myForm!: FormGroup;
  myForm: FormGroup = new FormGroup({});
  loading: boolean = false;
  createCheckout: any;
  registerData: any

  exampleForm = new FormGroup({
    exampleControl: new FormControl(''),
  });

  constructor(private accountServices: AccountsService, private toastr: ToastrService, private fb: FormBuilder, private router: Router, private dasboardServices: DashboardService) { }

  ngOnInit(): void {
    this.createForm()
  }

  signup() {
    this.loading = true;
    this.accountServices.rigster(this.signupObj).subscribe((data: any) => {
      this.registerData = data
      this.toastr.success('User registered successfully');
      this.loading = false;
      this.accountServices.createCheckoutSession(this.registerData.user.id, {
        "successUrl": "http://ebook-frontend-landingpage.s3-website.eu-west-2.amazonaws.com/main/thanks",
        "cancelUrl": "http://ebook-frontend-landingpage.s3-website.eu-west-2.amazonaws.com/accounts/login"
      }).subscribe((data: any) => {
        this.createCheckout = data
        window.location.href = this.createCheckout.url
      }, err => {
        this.toastr.error(err.error.message)
      })
      // this.router.navigateByUrl('/accounts/login')
    }, err => {
      this.toastr.error(err.error.message)
      this.loading = false;
    })
  }
  // forgot Password
  email: string = ''
  forgotPass() {
    this.accountServices.forgotPassword({
      "email": this.email
    }).subscribe((data: any) => {
      this.toastr.success("Please check your email")
      this.open = false;
    }, err => {
      this.toastr.error(err.error.message)
      this.open = false;
    })
  }
  createForm() {
    this.myForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      confirmpassword: ['', Validators.required]
    }, {
      validator: ConfirmedValidator('password', 'confirmpassword')
    });
  }

  showDialog(): void {
    this.open = true;
  }

}
