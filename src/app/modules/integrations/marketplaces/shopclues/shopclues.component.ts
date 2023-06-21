import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-shopclues',
  templateUrl: './shopclues.component.html',
  styleUrls: ['./shopclues.component.scss']
})
export class ShopcluesComponent implements OnInit {
  listing = false;
  newTemplate = false;
  
  constructor() { }

  ngOnInit(): void {
  }

}
