import { Component, EventEmitter, OnInit,Output } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserDto } from 'src/app/modal/dashboard-modal';
import { AccountsService } from 'src/app/services/accounts.service';
import { BookServicesService } from 'src/app/services/book-services.service';
import { DashboardService } from 'src/app/services/dashboard.service';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.css']
})
export class AccountSettingsComponent implements OnInit {

  open = false;
  userUpdate: any;
  userId: any;
  userObj = new UserDto();
  oldPassword: string = "";
  newPassword: string = "";
  loading: boolean = false;
  triggerChangeParent = new EventEmitter<any>();

  fileToUploadLogo:any;

  constructor(private dasboardServices: DashboardService, private toster: ToastrService, private accountServices: AccountsService,private router: Router,private bookServices: BookServicesService) { }
  ngOnInit(): void {
    this.getuser()
    
  }

  exampleForm = new FormGroup({
    exampleControl: new FormControl(''),
  });

  getuser() {
    this.userId = JSON.parse(localStorage.getItem('securityData') as string).user?.id
    this.dasboardServices.getUser(this.userId).subscribe((data: any) => {
      this.userObj = data;
    }, err => {
      this.toster.error(err.error.message)
    })
  }
  updateUser() {
    this.userId = JSON.parse(localStorage.getItem('securityData') as string).user?.id
    this.loading = true;
    this.dasboardServices.userUpdate(this.userId, this.userObj).subscribe((data: any) => {
      this.userUpdate = data;
      this.toster.success("Profile update successfully");
      this.loading = false;
    }, err => {
      this.toster.error(err.error.message)
      this.loading = false;
    })
  }
  updatePassword() {
    this.userId = JSON.parse(localStorage.getItem('securityData') as string).user?.id
    this.accountServices.updatePassword(this.userId, {
      "oldPassword": this.oldPassword,
      "newPassword": this.newPassword
    }).subscribe((data: any) => {
      this.toster.success("Password update successfully");
      this.open = false;
    }, err => {
      this.toster.error(err.error.message);
      // this.open = false;
    })
  }
  uploadImage(files: FileList) {
    this.userId = JSON.parse(localStorage.getItem('securityData') as string).user?.id
    // this.uploadingLogo = true;
    this.fileToUploadLogo = files.item(0);
    this.accountServices.profileImage(this.userId,this.fileToUploadLogo).subscribe((data: any) => {
      this.toster.success("Image uploaded successfully");
      this.triggerChangeParent.emit();
      this.getuser()
    }, err => {
      this.toster.error(err.error.message)
    })
  }

  showDialog(): void {
    this.open = true;
  }
}
