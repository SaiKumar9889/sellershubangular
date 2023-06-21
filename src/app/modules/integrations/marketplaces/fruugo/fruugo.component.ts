import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-fruugo',
  templateUrl: './fruugo.component.html',
  styleUrls: ['./fruugo.component.scss']
})
export class FruugoComponent implements OnInit {

  listing = false;
  newTemplate = false;
  constructor() { }

  ngOnInit(): void {
  }

  updatefruugousersetting(a){}
  testchannelconnection(a){}
  downloadchannelcatalog(a){}

}
