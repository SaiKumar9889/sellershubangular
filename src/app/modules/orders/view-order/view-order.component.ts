import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DatasharingService } from 'src/app/_service/datasharing.service';
import { SalsesOrdersService } from '../services/salses-orders.service';
import { ViewOrderService } from '../services/view-order.service';

@Component({
  selector: 'app-view-order',
  templateUrl: './view-order.component.html',
  styleUrls: ['./view-order.component.css']
})
export class ViewOrderComponent implements OnInit, OnDestroy {

  detailsSub: Subscription;
  activeOrderInfo: any;
  loading:boolean=false;
  orderDetails:any;
  constructor(private datasharingService: DatasharingService, private viewOrderService: ViewOrderService,private salsesOrdersService:SalsesOrdersService) {
    this.detailsSub = this.datasharingService.activeOrderDetails.subscribe(res => {
      ////console.log(res);
      if (res != undefined && res != null){
        this.activeOrderInfo = res;
        this.getOrdeDetails(res[0].khubOrderId?res[0].khubOrderId:res[0].channelOrderId);
      }

    });
  }
  ngOnDestroy(): void {
    this.detailsSub.unsubscribe();
  }

  ngOnInit(): void {
  }

  getOrdeDetails(orderid: any) {
    this.loading=true;
    this, this.viewOrderService.editOrderInfo(orderid).subscribe(res => {
      ////console.log(res);
      this.orderDetails=res;
      //console.log(this.orderDetails)
      this.loading=false;
    });
  }
notes:any=[];
  getNotes(){
    this.salsesOrdersService.getNotes(this.activeOrderInfo[0].channelOrderId).subscribe(res=>{
      ////console.log(res);
      this.notes=res;
    })
  }

  getImage(img: string) {
    return 'https://s3-us-west-1.amazonaws.com/khubweb/web/kartzhub' + img + '.png';
  }
  getSiteImage(img: string) {
    return 'https://s3-us-west-1.amazonaws.com/khubweb/web/' + img + '.png';
  }

  labelicon(obj:any){
    //console.log(obj)
    window.open(obj.labelPdfURLS[0], "_blank");
  }

}
