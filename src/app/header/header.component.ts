import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ManageUsersService } from '../modules/user-manage/services/manage-users.service';
import { CreateTicket } from '../_models/create-ticket';
import { Menu } from '../_models/Menu';
import { AllMenuTabs } from '../_models/Tabs';
import { ToastTypes } from '../_models/_toaster';
import { DatasharingService } from '../_service/datasharing.service';
import { LoginService } from '../_service/login.service';
import { ToasterService } from '../_service/toaster.service';
import { HeaderService } from '../_service/header.service';
import { SalsesOrdersService } from '../modules/orders/services/salses-orders.service';
declare var $: any;
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  countofnotifications: number = 0;
  countoftasks: number = 0;
  createTicket = new CreateTicket();
  useObj: any;
  allProducts: any = [];
  prod = true;
  order = false;
  constructor(private manageUsersService: ManageUsersService, private toasterService: ToasterService,
    private router: Router, private datasharingService: DatasharingService,
    private loginService: LoginService, private headerService: HeaderService, private userService: ManageUsersService,private salsesOrdersService: SalsesOrdersService) { }
  ngOnInit(): void {
    this.headerService.getExpiredProducts().subscribe(result => {
      console.log(result);
      this.allProducts = result;
    }, error => {
      console.error(error);
      })
    // throw new Error('Method not implemented.');
    this.status=localStorage.getItem('userSubscribe')
    this.getuserInfo();
    this.getSubscriptions();
    this.getDefaultData();
  }
  toggleSidemneu() {
    // ////console.log('clicked');
    this.datasharingService.togglesidemenu();
  }
  allSubscriptions: any = []; customerSubscriptions: any = []; selectedSubscriptionIndex = -1;status:any;
  expiringDays: any = ''; date: any = new Date();
  getSubscriptions() {
    this.userService.getAllSubscription().subscribe((res: any) => {
      this.selectedSubscriptionIndex = -1;
      this.allSubscriptions = res;
      // console.log(this.allSubscriptions)
      this.customerSubscriptions = res?.customerSubscriptions;
      
      // console.log(this.customerSubscriptions)
      if (this.allSubscriptions.trialSubscriber == true && this.customerSubscriptions[0].endDate >= this.date) {
        const date1: any = this.date;
        const date2: any = new Date(this.customerSubscriptions[0].endDate);
        const diffTime = Math.abs(date2 - date1);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        this.expiringDays = diffDays + " days";
        console.log(this.expiringDays)
      }
    }, error => {
      console.log(error)
    });
  };
  OpenSubscription() {
    let menu = { icon: '', pmenu: '', menuname: '', routerLink: '', haschildrens: false, tab: AllMenuTabs.suscrption };
    this.datasharingService.addtoTab(menu);
  }
  getuserInfo() {
    this.getProfileName();
    this.userInfo('');
  }
  onGoToHomePage() {

  }
  toggleRightSidemneu() {
    // ////console.log('clicked');
    this.datasharingService.toggleRightsidemenu();
  }

  name: string = "";
  email: string = "";
  getProfileName() {
    this.manageUsersService.getUsersData().subscribe((res: any) => {
      console.log(res);
      let userProfile = res.emailAddress == localStorage.getItem("userLoginEmail")
      if (userProfile && userProfile[0]) {
        localStorage.setItem("userRoles", userProfile[0].roles);
      } else {
        localStorage.setItem("userRoles", null);
      }
      this.name = res?.users[0].name;
      this.email = res?.emailaddress
      ;
    })
  }

  logout() {
    localStorage.clear();
    this.toasterService.openToastMessage(ToastTypes.success, 'SellersHub', 'Successfully loggedout');
    this.datasharingService.clearTabs();
    this.router.navigate(['/login']);

  }

  userInfo(type) {
    this.headerService.getUserInfo().subscribe(userInfo => {
      //console.log(userInfo);
      this.useObj = userInfo;
      this.setUserInfotoTicket();
      if (type === 'phoneSupport') {
        $('#psupport-modal').modal('show');
      }
      if (type === 'createTicket') {
        $('#ticket-modal').modal('show');
      }
    }, error => {
      console.error(error);
    });
  }
  onGoToAnnouncements() {
    this.router.navigate(['/announcments/announcments/']);
  }
  onGoToProducts(){
    $('#expired-products-modal').modal('show');
  }
  onGoToMessages() {
    this.router.navigate(['/announcments/messages/']);
  }
  addTab(tabname: string) {
    let menu: Menu;
    switch (tabname) {
      case 'My Account':
        menu = { icon: '', pmenu: '', menuname: '', routerLink: '', haschildrens: false, tab: AllMenuTabs.my_account };
        break;
        case 'Announcements':
        menu = { icon: '', pmenu: '', menuname: '', routerLink: '', haschildrens: false, tab: AllMenuTabs.announcements };
        break;
        case 'Releases':
        menu = { icon: '', pmenu: '', menuname: '', routerLink: '', haschildrens: false, tab: AllMenuTabs.releases };
        break;
      case 'User Management':
        menu = { icon: '', pmenu: '', menuname: '', routerLink: '', haschildrens: false, tab: AllMenuTabs.user_management };
        break;
      case 'Subscrption':
        menu = { icon: '', pmenu: '', menuname: '', routerLink: '', haschildrens: false, tab: AllMenuTabs.suscrption };
        break;
      case 'Reedem Coupon':
        menu = { icon: '', pmenu: '', menuname: '', routerLink: '', haschildrens: false, tab: AllMenuTabs.reedem_coupon };
        break;
      case 'User Guides':
        menu = { icon: '', pmenu: '', menuname: '', routerLink: '', haschildrens: false, tab: AllMenuTabs.user_guide };
        break;
    };

    this.datasharingService.addtoTab(menu);
  }

  openTicketModal() {
    this.userInfo('createTicket');
    this.isSuccessticketsupport = false;
  }

  ticketmodalclosed() {
    $('#ticket-modal').modal('hide');
  }

  openTPhoneSupportModal() {
    this.userInfo('phoneSupport');
    this.isSuccessPsupport = false;
  }
  setUserInfotoTicket() {
    this.createTicket = new CreateTicket();
    this.createTicket.name = this.useObj.name;
    this.createTicket.email = this.useObj.emailaddress;
    this.createTicket.phone = this.useObj.phone;
    this.createTicket.query = '';
  }
  getDefaultData() {
    this.salsesOrdersService.getAllOrders().subscribe((sales_orders: any) => {
      console.log(sales_orders);
    }, error => {
    });
  }
  expprodmodalclosed(){
    $('#expired-products-modal').modal('hide');
  }
  PhoneSupportmodalclosed() {
    $('#psupport-modal').modal('hide');
  }
  isSuccessticketsupport: boolean = false;
  createTiketSave() {
    //console.log(this.createTicket);
    this.headerService.createTicket(this.createTicket).subscribe(result => {
      //console.log(result);
      this.ticketmodalclosed();
      this.isSuccessticketsupport = true;
      this.toasterService.openToastMessage(ToastTypes.success, 'SellersHub', 'Thank you for requesting a call back. You will receive a call back shortly');
    }, error => {
      console.error(error)
      //  this.ticketmodalclosed();
      this.toasterService.openToastMessage(ToastTypes.success, 'SellersHub', 'Thank you for requesting a call back. You will receive a call back shortly');
      this.isSuccessticketsupport = true;
    })
  }
  isSuccessPsupport: boolean = false;
  phoneSupportSave() {
    //console.log(this.createTicket);
    this.headerService.phoneSupport(this.createTicket).subscribe(result => {
      //console.log(result);
      this.toasterService.openToastMessage(ToastTypes.success, 'SellersHub', 'SuThank you for requesting a call back. You will receive a call back shortlyccess');
      this.PhoneSupportmodalclosed();
      this.isSuccessPsupport = true;
    }, error => {
      console.error(error);
      this.PhoneSupportmodalclosed();
      this.isSuccessPsupport = true;
      this.toasterService.openToastMessage(ToastTypes.success, 'SellersHub', 'Thank you for requesting a call back. You will receive a call back shortly');
    })
  }
}
