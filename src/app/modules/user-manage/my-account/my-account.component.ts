import { Component, OnInit } from '@angular/core';
import { ToastTypes } from 'src/app/_models/_toaster';
import { DatasharingService } from 'src/app/_service/datasharing.service';
import { ToasterService } from 'src/app/_service/toaster.service';
import { environment } from 'src/environments/environment';
import { UserAccount } from '../models/User';
import { ManageUsersService } from '../services/manage-users.service';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.css']
})
export class MyAccountComponent implements OnInit {
  loading: boolean = false;
  companyName: string = '';
  address1: string = '';
  address2: string = '';
  city: string = '';
  state: string = '';
  // country: string = '';
  emailAddress: string = '';
  phoneNumber: string = '';
  zipCode: string = '';
  vatregistered: boolean = false;
  vatnumber: string = '';
  country: any[] = [];
  selectedCountryvalue: string = '';
  countryData:any[]=[];

  constructor(private toasterService: ToasterService, private userService: ManageUsersService, private datasharingService: DatasharingService) { }

  ngOnInit(): void {

  // debugger;
    // this.countryData = this.datasharingService.getCountries();
    // // for(let i=0;i>this.countryData.length;i++){
    // //   this.country=this.countryData[1].slice(2,4);
    // // }
    // //  this.country=this.countryData[0].slice(2,4);
    // ////console.log("countrieslist:",this.countryData[0]);
    this.country = this.datasharingService.getCountries();
    this.bindmyAccount();
  }
  bindmyAccount() {
    this.loading = true;
    this.userService.accountSettings().subscribe((res: any) => {
      ////console.log("myaccount::", res);
      // debugger;

      this.companyName = res.kartzhubUser.companyName,
        this.address1 = res.kartzhubUser.address1,
        this.address2 = res.kartzhubUser.address2,
        this.city = res.kartzhubUser.city,
        this.state = res.kartzhubUser.state,
        this.selectedCountryvalue = res.kartzhubUser.country,
        this.emailAddress = res.kartzhubUser.emailAddress,
        this.phoneNumber = res.kartzhubUser.phoneNumber,
        this.zipCode = res.kartzhubUser.zipCode,
        this.vatregistered = res.kartzhubUser.vatregistered,
        this.vatnumber = res.kartzhubUser.vatnumber
      // this.toasterService.openToastMessage(ToastTypes.success, 'User', 'User Updated success');
      this.loading = false;
    },
      error => {
        this.toasterService.openToastMessage(ToastTypes.info, 'Sellershub', error);
        this.loading = false;
      });
  }

  // countrylistChangeHandler(event: any) {
  //   // this.selectedCountryvalue = event.target.value;
  // }

  async saveOrUpdateUser() {
    // debugger;
    if (this.companyName == '') {
      this.toasterService.openToastMessage(ToastTypes.warning, 'Account', 'Please enter company name');
      return;
    }
    if (this.address1 == '') {
      this.toasterService.openToastMessage(ToastTypes.warning, 'Account', 'Please enter address1');

      return;
    }
    if (this.address2 == '') {
      this.toasterService.openToastMessage(ToastTypes.warning, 'Account', 'Please enter address2');
      return;
    }

    if (this.city == '') {
      this.toasterService.openToastMessage(ToastTypes.warning, 'Account', 'Please enter city');
      return;
    }
    if (this.state == '') {
      this.toasterService.openToastMessage(ToastTypes.warning, 'Account', 'Please select state');
      return;
    }
    if (this.selectedCountryvalue == '') {
      this.toasterService.openToastMessage(ToastTypes.warning, 'Account', 'Please select country');
      return;
    }
    let regexpNumber = new RegExp('^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$');
    ////console.log(regexpNumber.test(this.emailAddress));
    if (this.emailAddress == '' || !regexpNumber.test(this.emailAddress)) {
      this.toasterService.openToastMessage(ToastTypes.warning, 'Account', 'Please enter valid email');
      return;
    }
    if (this.phoneNumber == '') {
      this.toasterService.openToastMessage(ToastTypes.warning, 'Account', 'Please enter phone number');
      return;
    }
    if (this.zipCode == '') {
      this.toasterService.openToastMessage(ToastTypes.warning, 'Account', 'Please select zipCode');
      return;
    }
    if (this.vatnumber == '') {
      this.toasterService.openToastMessage(ToastTypes.warning, 'Account', 'Please select vat number');
      return;
    }

    let addUser: UserAccount = {
      companyName: this.companyName,
      address1: this.address1,
      address2: this.address2,
      city: this.city,
      state: this.state,
      country: this.selectedCountryvalue,
      emailAddress: this.emailAddress,
      phoneNumber: this.phoneNumber,
      zipCode: this.zipCode,
      vatregistered: this.vatregistered,
      vatnumber: this.vatnumber
    };
    // debugger;
    this.userService.adduser(addUser).subscribe(res => {
      // debugger;
      ////console.log("addeduser::", res);
      this.toasterService.openToastMessage(ToastTypes.success, 'Account', 'Account Created');
      this.clear();
      this.bindmyAccount();
    }, eoor => {
      ////console.log("Error addeduser::");
      this.toasterService.openToastMessage(ToastTypes.warning, 'SellersHub', 'Error');
    });
  }

  clear() {
    this.companyName = '',
      this.address1 = '',
      this.address2 = '',
      this.city = '',
      this.state = '',
      this.country = this.datasharingService.getCountries();
      this.emailAddress = '',
      this.phoneNumber = '',
      this.zipCode = '',
      this.vatregistered = false,
      this.vatnumber = '';
  }

}
