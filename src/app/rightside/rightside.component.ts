import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DatasharingService } from '../_service/datasharing.service';

@Component({
  selector: 'app-rightside',
  templateUrl: './rightside.component.html',
  styleUrls: ['./rightside.component.css']
})
export class RightsideComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  activeTheme: string = '';
  constructor(private datasharingService: DatasharingService) {
    this.subscription = this.datasharingService.isRightSideMenuOpened.subscribe((data) => {
      //////console.log(data);
      this.isRightSideMenuOpened = data;
    });
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  isRightSideMenuOpened: boolean = false;

  ngOnInit(): void {
  }
  toggleRightSidemneu() {
    // ////console.log('clicked');
    this.datasharingService.toggleRightsidemenu();
  }
  setTheme(theme: any) {
    this.activeTheme = theme;
    this.datasharingService.changeTheme(theme);
  }
}
