import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { CreateProductService } from '../services/create-product.service';

@Component({
  selector: 'app-product-tracking',
  templateUrl: './product-tracking.component.html',
  styleUrls: ['./product-tracking.component.scss']
})
export class ProductTrackingComponent implements OnInit, OnChanges {

  @Input() sku;
  constructor(private createProductService: CreateProductService) { }
  ngOnChanges(changes: SimpleChanges): void {
    console.log(this.sku);
    //if (this.sku)
    this.getInventoryTrackingDetails();
  }

  ngOnInit(): void {
  }

  allTransactions: any = [];
  getInventoryTrackingDetails() {
    this.createProductService.inverntory_trcking(this.sku).subscribe(res => {
      console.log(res);
      this.allTransactions = res;
    })
  }
}
