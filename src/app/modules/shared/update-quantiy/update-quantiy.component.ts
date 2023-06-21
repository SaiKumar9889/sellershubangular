import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-update-quantiy',
  templateUrl: './update-quantiy.component.html',
  styleUrls: ['./update-quantiy.component.scss']
})
export class UpdateQuantiyComponent implements OnInit {

  @Input() editedProductDetails:any;
  @Input() channelDet:any;
  constructor() { }

  ngOnInit(): void {
  }

}
