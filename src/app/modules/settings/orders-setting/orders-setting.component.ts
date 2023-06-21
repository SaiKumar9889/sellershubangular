import { Component, OnInit } from '@angular/core';
import { OrderSettingService } from '../services/order-setting.service';
import { ToastTypes } from 'src/app/_models/_toaster';
import { ToasterService } from 'src/app/_service/toaster.service';
declare var $: any;

@Component({
  selector: 'app-orders-setting',
  templateUrl: './orders-setting.component.html',
  styleUrls: ['./orders-setting.component.css']
})
export class OrdersSettingComponent implements OnInit {
  loading:boolean=false;
  pickList: any;
  packList: any;
  type;
  checkoutmsg;
  shippingaddr;
  stockremain;
  qty;
  orderid;
  channel;
  title;
  orderdate;
  warehouse;
  transid;
  itemid;
  shippedcountry;
  location;
  buyername;
  barcode;



  constructor(private orderService: OrderSettingService,private toasterService: ToasterService) { }

  ngOnInit(): void {
  }

  modalclosed() {
    $('#picklist-modal').modal('hide');
  }


  picklist(){
    $('#picklist-modal').modal('show');
    this.orderService.getPicklist().subscribe((res: any) => {
      ////console.log(res);
      this.pickList = res;
      this.checkoutmsg = res['checkoutmessage'];
      this.shippingaddr = res['shippingaddress'];
      this.stockremain = res['stockremaining'];
      this.qty = res['quantity'];
      this.orderid = res['orderid'];
      this.channel = res['channel'];
      this.title = res['title'];
      this.orderdate = res['orderdate'];
      this.warehouse = res['warehouse'];
      this.transid = res['transactionid'];
      this.itemid = res['itemid'];
      this.shippedcountry = res['shippedcountry'];
      this.location = res['location'];
      this.buyername = res['buyername'];

    })
  }

  savePicklist(){
    // ////console.log(this.checkoutmsg);
    this.orderService.getupdatePicklist(this.title,this.orderid,this.transid,this.orderdate,this.itemid,this.channel,this.checkoutmsg,this.warehouse,this.location,this.stockremain,this.shippingaddr,this.shippedcountry,this.buyername,this.qty).subscribe((res: any) => {
      this.toasterService.openToastMessage(ToastTypes.success, 'SellersHub', res.error.text);
    })
  }

  packlist(){
    $('#packlist-modal').modal('show');
    this.orderService.getPacklist().subscribe((res: any) => {
      ////console.log(res);
      this.packList = res;
      this.checkoutmsg = res['checkoutmessage'];
      this.stockremain = res['stockremaining'];
      this.qty = res['quantity'];
      this.orderid = res['orderid'];
      this.channel = res['channel'];
      this.title = res['title'];
      this.orderdate = res['orderdate'];
      this.warehouse = res['warehouse'];
      this.transid = res['transactionid'];
      this.itemid = res['itemid'];
      this.barcode = res['barcode'];
      this.location = res['location'];
      this.buyername = res['buyername'];
    })
  }

  savePacklist(){
    // ////console.log(this.checkoutmsg);
    this.orderService.getupdatePacklist(this.title,this.orderid,this.transid,this.orderdate,this.itemid,this.channel,this.checkoutmsg,this.warehouse,this.location,this.stockremain,this.buyername,this.qty,this.barcode).subscribe((res: any) => {
      this.toasterService.openToastMessage(ToastTypes.success, 'SellersHub', res.error.text);
    })
  }

  // notify2Model() {
  //   this.loading=true;
  //   this.type = 'newordernotificationseller';
  //   this.notifyService.getNotification(this.type).subscribe((res: any) => {
  //     ////console.log(res);
  //     this.allChannel = res?.channelUsersall || [];
  //     this.loading = false;
  //     this.toasterService.openToastMessage(ToastTypes.success, 'SellersHub', 'Please Wait');
  //     // this.loadTablePagenation();
  //   }, eoor => {
  //     this.toasterService.openToastMessage(ToastTypes.warning, 'SellersHub', 'Error');
  //   });

  //   $('#notify_2-modal').modal('show');
  // };
}
