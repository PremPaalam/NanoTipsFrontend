import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LogInDto, SignInDto } from 'src/app/modal/security.modal';
import { AccountsService } from 'src/app/services/accounts.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  open = false;
  signupObj = new SignInDto();
  loginObj = new LogInDto();
  myForm!: FormGroup;
  loading: boolean = false

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
    });
  }
  showDialog(): void {
    this.open = true;
  }

}
