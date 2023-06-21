import { Component, OnInit } from '@angular/core';
import { ToastTypes } from 'src/app/_models/_toaster';
import { ToasterService } from 'src/app/_service/toaster.service';
import { User, UserPermission } from '../models/User';
import { ManageUsersService } from '../services/manage-users.service';
declare var $: any;

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.css']
})
export class ManageUsersComponent implements OnInit {

  constructor(private toasterService: ToasterService, private userService: ManageUsersService) { }

  ngOnInit(): void {
    this.userEmail = localStorage.getItem("userLoginEmail");
   this.getUserdata();
  }

  loading: boolean = false;
  pageSize = 50;
  collectionsize = 0;
  allUser: any[] = [];
  searchValue: any = '';
  searchBy: any = 0;
  searchFrom: any = '';
  searchTo: any = '';
  topsalepercent: any = 0;
  topproductpercent: any = 0;
  topsaleValue: any = 0;
  topproductunits: any = 0;
  productTitle: string = '';
  page = 1;
  page2 = 1;
  currentPage = 3;
  disablepage = 3;
  isDisabled = true;
  productIsSelected: boolean = false;

  emailAddress: any = '';
  id: any = '';
  name: any = '';
  newpassword: any = '';
  password: any = '';
  currentpassword: any = '';
  passwordToken: any = '';
  phoneNumber: any = '';
  isEdit: boolean = false;
  newuserId: any = '';

  userId: number = 0;
  kartzhubUserId: number = 0;
  userpermissions: any;
  userroles: any;

  admin: boolean = false;
  dashboard: boolean = false;
  inventory: boolean = false;
  order: boolean = false;
  customer: boolean = false;
  stockrepricer: boolean = false;
  reports: boolean = false;

  userEmail = '';

  toggleDisabled() {
    this.isDisabled = !this.isDisabled;
  }

  changespage(page: any) {
    this.getUserdata();
  }

  getUserdata() {
    this.loading = true;
    this.userService.getUsersData().subscribe((res: any) => {
     this.allUser = res.sort((a, b) => a.id > b.id ? 1 : -1);
      this.collectionsize = res?.page?.totalResults;
      this.page = res?.page?.currentPageNumber;
      this.loading = false;    
      this.toasterService.openToastMessage(ToastTypes.success, 'SellersHub', 'Please Wait');
    }, eoor => {
      this.loading = false;
      this.toasterService.openToastMessage(ToastTypes.warning, 'SellersHub', 'Error');
    });
  };

  changePageSize() {
    this.getUserdata();
  }

  modalclosed() {
    $('#create-newuser-modal').modal('hide');
    this.clear();
  }

  clear() {
    this.emailAddress = '';
    this.name = '';
    this.newpassword = '';
    this.password = '';
    this.currentpassword = '';
    // this.passwordToken= '';
    // this.phoneNumber= '';
  }


  addUser() {
    this.isEdit = false;
  }

  async saveOrUpdateUser() {
    if (this.name == '') {
      this.toasterService.openToastMessage(ToastTypes.warning, 'User', 'Please enter name');
      return;
    }
    let regexpNumber = new RegExp('^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$');
    if (this.emailAddress == '' || !regexpNumber.test(this.emailAddress)) {
      this.toasterService.openToastMessage(ToastTypes.warning, 'User', 'Please enter valid email');
      return;
    }

    if (this.newpassword == '') {
      this.toasterService.openToastMessage(ToastTypes.warning, 'User', 'Please enter new password');
      return;
    }
    if (this.password == '') {
      this.toasterService.openToastMessage(ToastTypes.warning, 'User', 'Please re-enter password');
      return;
    }


    if (this.password != this.newpassword) {
      this.toasterService.openToastMessage(ToastTypes.warning, 'User', 'New password & Re-enter password dont match.');
      return;
    }

    let id = -1;

    let adduser: User = {
      id: id,
      name: this.name,
      emailAddress: this.emailAddress,
      newpassword: this.newpassword,
      password: this.password,
      currentpassword: this.currentpassword,
    };

    this.loading = true;
    this.userService.updateuser(adduser).subscribe(res => {
      this.toasterService.openToastMessage(ToastTypes.success, 'User', 'User Created success');
      this.modalclosed();
      this.loading = false;
      this.isEdit = true;
    },
      error => {
        this.toasterService.openToastMessage(ToastTypes.info, 'Sellershub', error);
        this.loading = false;
      });
    this.getUserdata();
  }

  selecteduserid: any;

  editUser(selecteduser: any) {
    this.isEdit = true;
    this.selecteduserid = selecteduser.id;
    this.name = selecteduser.name;
    this.emailAddress = selecteduser.emailAddress;

    $('#create-newuser-modal').modal('show');
  }

  updateUser() {
    let id = this.selecteduserid;
    if (this.name == '') {
      this.toasterService.openToastMessage(ToastTypes.warning, 'User', 'Please enter name');
      return;
    }
    let regexpNumber = new RegExp('^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$');
    if (this.emailAddress == '' || !regexpNumber.test(this.emailAddress)) {
      this.toasterService.openToastMessage(ToastTypes.warning, 'User', 'Please enter valid email');
      return;
    }

    if (this.newpassword == '') {
      this.toasterService.openToastMessage(ToastTypes.warning, 'User', 'Please enter new password');
      return;
    }
    if (this.password == '') {
      this.toasterService.openToastMessage(ToastTypes.warning, 'User', 'Please re-enter password');
      return;
    }
    // if (this.currentpassword == '') {
    //   this.toasterService.openToastMessage(ToastTypes.warning, 'User', 'Please enter current password');
    //   return;
    // }

    if (this.password != this.newpassword) {
      this.toasterService.openToastMessage(ToastTypes.warning, 'User', 'New password & Re-enter password dont match.');
      return;
    }

    let adduser: User = {
      id: this.selecteduserid,
      name: this.name,
      emailAddress: this.emailAddress,
      newpassword: this.newpassword,
      password: this.password,
      currentpassword: this.currentpassword,
    };

    this.loading = true;
    this.userService.updateuser(adduser).subscribe(res => {
      this.toasterService.openToastMessage(ToastTypes.success, 'User', 'User Updated success');
      this.modalclosed();
      this.loading = false;
    },
      error => {
        this.toasterService.openToastMessage(ToastTypes.info, 'Sellershub', error);
        this.loading = false;
      });
    this.getUserdata();
  }

  removeuserId: number = 0;
  removewUser(user: any) {
    this.removeuserId = user.id;
    $('#removeuser-modal').modal('show');
  }

  closeremoveuserModal() {
    $('#removeuser-modal').modal('hide');
  }

  removeUserDetails() {
    this.loading = true;
    this.userService.removeuser(this.removeuserId).subscribe((res: any) => {
      this.toasterService.openToastMessage(ToastTypes.info, 'Sellershub', "Remove User success");
      this.loading = false;
    },
      error => {
        this.toasterService.openToastMessage(ToastTypes.info, 'Sellershub', error);
        this.loading = false;
      });
    this.closeremoveuserModal();
    this.getUserdata();
  }


  userpermission(user: any) {
    this.userId = user.id;

    this.userService.editaccountsubuserpermissions(this.userId).subscribe((res: any) => {
      ////console.log("edit user permission", res);

      this.userpermissions = res;
      this.userroles = res.roles;
      this.kartzhubUserId = this.userpermissions.kartzhubUserId;

      if (this.userroles[0].role == 'ADMIN') {
        if (this.userroles[0].enable == true) {
          this.admin = true;
        }
      }

      if (this.userroles[0].role == 'DASHBOARD') {
        if (this.userroles[0].enable == true) {
          this.dashboard = true;
        }
      }
      if (this.userroles[0].role == 'INVENTORY') {
        if (this.userroles[0].enable == true) {
          this.inventory = true;
        }
      }
      if (this.userroles[0].role == 'ORDER') {
        if (this.userroles[0].enable == true) {
          this.order = true;
        }
      }
      if (this.userroles[0].role == 'CUSTOMER') {
        if (this.userroles[0].enable == true) {
          this.customer = true;
        }
      }
      if (this.userroles[0].role == 'STOCK REPRICER') {
        if (this.userroles[0].enable == true) {
          this.stockrepricer = true;
        }
      }
      if (this.userroles[0].role == 'REPORTS') {
        if (this.userroles[0].enable == true) {
          this.reports = true;
        }
      }
      this.loading = false;
    },
      error => {
        this.toasterService.openToastMessage(ToastTypes.info, 'Sellershub', error);
        this.loading = false;
      });
    $('#userpermission-modal').modal('show');
  }

  closepermissionModal() {
    this.admin = false;
    this.dashboard = false;
    this.inventory = false;
    this.order = false;
    this.customer = false;
    this.stockrepricer = false;
    this.reports = false;
    $('#userpermission-modal').modal('hide');
  }

  // adminpermission: string;
  // dashboardpermission: string;
  // inventorypermission: string;
  // orderpermission: string;
  // customerpermission: string;
  // stockrepricerpermission: string;
  // reportspermission: string;

  saveuserpermission() {
    this.loading = true;
    ////console.log("Save permission", this.admin + "," + this.dashboard + "," + this.inventory + "," + this.order + "," + this.customer + "," + this.stockrepricer + "," + this.reports);

    let selectedpermissions: Array<string> = [];

    if (this.admin == true) {
      selectedpermissions.push('ADMIN');
    }
    if (this.dashboard == true) {
      selectedpermissions.push('DASHBOARD');
    }
    if (this.inventory == true) {
      selectedpermissions.push('INVENTORY');
    }
    if (this.order == true) {
      selectedpermissions.push('ORDER');
    }
    if (this.customer == true) {
      selectedpermissions.push('CUSTOMER');
    }
    if (this.stockrepricer == true) {
      selectedpermissions.push('STOCK REPRICER');
    }
    if (this.reports == true) {
      selectedpermissions.push('REPORTS');
    }

    let userpermissions: UserPermission = {
      value1: selectedpermissions
    };

    this.loading = true;
    this.userService.savepermissions(this.kartzhubUserId, this.userId, userpermissions).subscribe(res => {
      this.toasterService.openToastMessage(ToastTypes.success, 'User', 'User Created success');
      this.modalclosed();
      this.loading = false;
      this.isEdit = true;
    },
      error => {
        this.toasterService.openToastMessage(ToastTypes.info, 'Sellershub', error);
        this.loading = false;
      });


    this.closepermissionModal();
    this.getUserdata();
  }

}
