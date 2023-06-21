import { Component, OnInit } from '@angular/core';

import { Subscription } from 'rxjs';
import { DatasharingService } from 'src/app/_service/datasharing.service';

@Component({
  selector: 'app-accounting-inte',
  templateUrl: './accounting-inte.component.html',
  styleUrls: ['./accounting-inte.component.scss']
})
export class AccountingInteComponent implements OnInit {

  activeIntegration: any;
  channelType: number = 2;
  channelId: number = 0;
  isNewCreation: boolean = false;

  detailSub: Subscription;
  channelSub: Subscription;

  constructor(private datasharingService: DatasharingService) { }
  ngOnDestroy(): void {
    this.detailSub.unsubscribe();
    this.channelSub.unsubscribe();
  }

  ngOnInit(): void {
    this.detailSub=this.datasharingService.activeIntrgrationType.subscribe(res => {
      if (res != undefined) {
        this.activeIntegration = res[0];
        ////console.log(res);
        this.channelType = this.activeIntegration.channel_id;
        this.channelId=this.activeIntegration?.id;
        //console.log(this.channelType)
      }
    });

    this.channelSub=this.datasharingService.isNewMarketCreation.subscribe(res => {
      this.isNewCreation = res;
      // console.log(res);
    });
  }

}