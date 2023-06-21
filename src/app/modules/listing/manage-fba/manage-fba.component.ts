import { Component, OnInit } from '@angular/core';
import { TrackMenus } from 'src/app/_models/menuForTrack';
import { pages } from 'src/app/_models/pages';
import { subMenus } from 'src/app/_models/subMenuTrack';
import { usertrackInput } from 'src/app/_models/usertrackInput';
import { AppTrackingService } from 'src/app/_service/app-tracking.service';

@Component({
  selector: 'app-manage-fba',
  templateUrl: './manage-fba.component.html',
  styleUrls: ['./manage-fba.component.css']
})
export class ManageFbaComponent implements OnInit {

  constructor(private appTrackingService:AppTrackingService) { 
    let ip:usertrackInput={menu:TrackMenus.LISTINGS,submenu:subMenus.MANAGEFBA,page:pages.MANAGEFBAPAGE,function:"",descrption:"Manage FBA page loaded"};
    this.appTrackingService.trackUserActivity(ip);
  }

  ngOnInit(): void {
  }

}
