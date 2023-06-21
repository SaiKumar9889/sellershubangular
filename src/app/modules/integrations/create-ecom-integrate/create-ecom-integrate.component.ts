import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DatasharingService } from 'src/app/_service/datasharing.service';

@Component({
  selector: 'app-create-ecom-integrate',
  templateUrl: './create-ecom-integrate.component.html',
  styleUrls: ['./create-ecom-integrate.component.css']
})
export class CreateEcomIntegrateComponent implements OnInit,OnDestroy {

  
  activeIntegration: any;
  channelType: number = 2;
  channelId: number = 0;
  isNewCreation: boolean = false;

  detailSub: Subscription;
  channelSub: Subscription;
  constructor(private datasharingService: DatasharingService) { }

  ngOnInit(): void {
    this.detailSub=this.datasharingService.activeIntrgrationType_ecom.subscribe(res => {
      if (res != undefined) {
        this.activeIntegration = res[0];
        ////console.log(res);
        this.channelType = parseInt(this.activeIntegration.channel_id);
        this.channelId=this.activeIntegration?.id;
      }
    });

    this.channelSub=this.datasharingService.isNewMarketCreation_ecom.subscribe(res => {
      this.isNewCreation = res;
    });
  }
  ngOnDestroy(): void {
    this.detailSub.unsubscribe();
    this.channelSub.unsubscribe();
  }
}
