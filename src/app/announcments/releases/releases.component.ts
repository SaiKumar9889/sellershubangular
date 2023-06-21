import { Component, OnInit } from '@angular/core';
declare var $: any;
@Component({
  selector: 'app-releases',
  templateUrl: './releases.component.html',
  styleUrls: ['./releases.component.scss']
})
export class ReleasesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  openMoreInfo(){
    $('#release-modal').modal('show');
  }
  modalclosed() {
    $('#release-modal').modal('hide');
  }
}
