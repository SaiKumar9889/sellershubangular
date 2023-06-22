import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
// import { ManageUsersService } from 'src/app/modules/user-manage/services/manage-users.service';
import { TrackMenus } from 'src/app/_models/menuForTrack';
import { pages } from 'src/app/_models/pages';
import { subMenus } from 'src/app/_models/subMenuTrack';
import { usertrackInput } from 'src/app/_models/usertrackInput';
import { ToastTypes } from 'src/app/_models/_toaster';
import { AppTrackingService } from 'src/app/_service/app-tracking.service';
import { LoginService } from 'src/app/_service/login.service';
import { ToasterService } from 'src/app/_service/toaster.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: string = '';
  password: string = '';
  ipaddress: string = '';
  loading: boolean = false;
  loginform = FormGroup;
  femail: any = '';
  otp: any;
  isForgotPassword: boolean = false;

  constructor(private appTrackingService: AppTrackingService, private toasterService: ToasterService, private router: Router, private urlApi: LoginService) {
    let ip: usertrackInput = { menu: TrackMenus.OTHERS, submenu: subMenus.OTHERS, page: pages.LOGINPAGE, function: "", descrption: "Login page loaded" };
    this.appTrackingService.trackUserActivity(ip);
  }
  backToLogin() {
    this.isForgotPassword = false;
  }
  gotpForgotPass() {
    this.isForgotPassword = true;
  }
  sendResetEmail() {

    this.urlApi.forgotpassword(this.femail).subscribe((res: any) => {
      //console.log(res);
      Swal.fire(
        'Alert !',
        res.message,
        'warning'
      )
      this.isFpass = true;
    })
  }
  ngOnInit(): void {
    if (localStorage.getItem('userToken') != null && localStorage.getItem('userLoginEmail') != null)
      this.router.navigate(['/sellershub']);
  }

  gotoDashboard() {
    this.isFpass = false;
    // this.router.navigate(['/admin']);
    this.getLogin();
  }

  getLogin() {
    this.urlApi.getLogin(this.email, this.password).subscribe((res: any) => {
      ////console.log(res);
      if (res.enabled == false) {
        Swal.fire(
          'Alert !',
          res.message,
          'warning'
        )
      }
      else if (res.success == true) {
        localStorage.setItem("userLoginName", this.email);
        localStorage.setItem("userLoginEmail", this.email);
        localStorage.setItem("userToken", res.token);
        localStorage.setItem("userId", res.userId);
        localStorage.setItem(
          "userSubscribe",
          res.subscriptionStatus
        );
        // this.getProfileName();
        this.toasterService.openToastMessage(ToastTypes.success, 'SellersHub', 'Successfully loggedin');
        this.router.navigate(['/sellershub']);
      } else {
        this.toasterService.openToastMessage(ToastTypes.warning, 'SellersHub', 'Please check the credentials');
      }
    },
      error => {
        this.toasterService.openToastMessage(ToastTypes.warning, 'SellersHub', 'Please check the credentials');
      }

    );
  }

  // getProfileName(){
  //   this.urlApi.ManageUsersService().subscribe(res=>{
  //     ////console.log(res);
  //   })
  // }
  fpassword: any;
  isFpass: boolean = false;
  loginAgain() {
    this.urlApi.getLogin(this.femail, this.fpassword).subscribe((res: any) => {
      ////console.log(res);
      if (res.enabled == false) {
        Swal.fire(
          'Alert !',
          res.message,
          'warning'
        )
      }
      else if (res.success == true) {
        localStorage.setItem("userLoginName", this.femail);
        localStorage.setItem("userLoginEmail", this.femail);
        localStorage.setItem("userToken", res.token);
        localStorage.setItem(
          "userSubscribe",
          res.subscriptionStatus
        );
        // this.getProfileName();
        this.toasterService.openToastMessage(ToastTypes.success, 'SellersHub', 'Successfully loggedin');
        this.router.navigate(['/sellershub']);
      } else {
        this.toasterService.openToastMessage(ToastTypes.warning, 'SellersHub', 'Please check the credentials');
      }
    },
      error => {
        this.toasterService.openToastMessage(ToastTypes.warning, 'SellersHub', 'Please check the credentials');
      }

    );
  }
  gotoReg() {
    this.router.navigate(['/login/registration']);
  }
  updatePassword() {
    if (this.otp == null || this.otp == '' || this.otp == undefined) {
      this.toasterService.openToastMessage(ToastTypes.warning, 'SellersHub', 'Please enter OTP');
      return;
    }
    if (this.femail == null || this.femail == '' || this.femail == undefined) {
      this.toasterService.openToastMessage(ToastTypes.warning, 'SellersHub', 'Please enter Email Id');
      return;
    }
    if (this.fpassword == null || this.fpassword == '' || this.fpassword == undefined) {
      this.toasterService.openToastMessage(ToastTypes.warning, 'SellersHub', 'Please enter New Password');
      return;
    }
    this.urlApi.passwordResetSubmit(this.otp, this.femail, this.fpassword).subscribe(res => {
      console.log(res);
      this.backToLogin();
      this.toasterService.openToastMessage(ToastTypes.success, 'SellersHub', 'Password Successfully updated');
      return;
    });
  }
}
