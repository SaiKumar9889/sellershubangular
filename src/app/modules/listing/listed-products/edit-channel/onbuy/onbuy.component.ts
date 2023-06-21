import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-onbuy',
  templateUrl: './onbuy.component.html',
  styleUrls: ['./onbuy.component.scss']
})
export class OnbuyComponent implements OnInit {

  @Input()
  channelProduct:any;
  @Input()
  productImages:any;

  @Input()
  templates:any;


  @Input()
  product:any;

  @Output() closeEvent :EventEmitter<any> = new EventEmitter<any>();
  constructor() { }

  ngOnInit(): void {
    this.channelProduct = this.product.channelproduct;
    this.productImages = this.product.productimages;
    this.templates = this.product.templates;
  }
  close(){
    this.closeEvent.emit(false);
  }
}
