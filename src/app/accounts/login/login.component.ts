import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { LogInDto, SignInDto } from 'src/app/modal/security.modal';
import { AccountsService } from 'src/app/services/accounts.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

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
  loading: boolean = false;
  email: string = ''

  exampleForm = new FormGroup({
    exampleControl: new FormControl(''),
  });

  constructor(private accountServices: AccountsService, private toastr: ToastrService, private fb: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.createForm()
  }
  signup() {
    this.loading = true;
    this.accountServices.rigster(this.signupObj).subscribe((data: any) => {
      this.toastr.success('User registered successfully');
      this.loading = false;
    }, err => {
      this.toastr.error(err.error.message)
      this.loading = false;
    })
  }
  // login
  login() {
    this.loading = true;
    this.accountServices.loginIn(this.loginObj).subscribe((data: any) => {
      this.toastr.success('logged in successfully');
      this.loading = false;
      setTimeout(() => {
        this.router.navigateByUrl('/main/home')

      }, 1000);
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
