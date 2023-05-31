import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { LogInDto, SignInDto } from 'src/app/modal/security.modal';
import { AccountsService } from 'src/app/services/accounts.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { DashboardService } from 'src/app/services/dashboard.service';
import { ConfirmedValidator } from '../confirm-password-valid/confirm-password-validators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  open = false;
  signupObj = new SignInDto();
  loginObj = new LogInDto();
  myForm!: FormGroup;
  user: any;
  userId: any
  loading: boolean = false;
  email: string = ''

  exampleForm = new FormGroup({
    exampleControl: new FormControl(''),
  });

  constructor(private accountServices: AccountsService, private toastr: ToastrService, private fb: FormBuilder, private router: Router, private dasboardServices: DashboardService,) { }

  ngOnInit(): void {
    this.createForm()
  }


  // login
  login() {
    this.loading = true;
    this.accountServices.loginIn(this.loginObj).subscribe((data: any) => {
      this.toastr.success('logged in successfully');
      this.loading = false;
      this.router.navigateByUrl('/main/book-list');
    }, err => {
      this.toastr.error(err.error.message)
      this.loading = false;
    })
  }
  createForm() {
    this.myForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      confirmpassword: ['', Validators.required]
    }, {
      validator: ConfirmedValidator('confirmpassword', 'confirmpassword')
    });
  }
  showDialog(): void {
    this.open = true;
  }
  // forgot Password
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

}
