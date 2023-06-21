import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { Utills } from 'src/app/utills/Utills';
declare var $: any;
@Component({
  selector: 'app-print-picklist',
  templateUrl: './print-picklist.component.html',
  styleUrls: ['./print-picklist.component.scss']
})
export class PrintPicklistComponent implements OnInit {

  constructor(public datepipe: DatePipe, private dbService: NgxIndexedDBService,) { }
  @Input() data;
  @Input() template;
  selectedOrderData: any = [];
  selectedOrderData_res: any = [];
  loading: any = false;
  header: any[] = [];
  channelsalessku = [];
  category: any;
  async ngOnInit() {
    this.loading = true;
    this.selectedOrderData_res = JSON.parse(localStorage.getItem('printpicklist'));



    this.dbService.getAll('shub').subscribe(async (peoples: any) => {
      //console.log(peoples);
      this.selectedOrderData_res = peoples.find(pp => pp.key == 'printpicklist')?.value;
      this.selectedOrderData_res = JSON.parse(this.selectedOrderData_res);
      this.channelsalessku = []
      this.selectedOrderData_res.forEach(order => {
        this.header = JSON.parse(order.channelUser.labelHeaderText);
        console.log(this.header)

        // order.channelUser.labelHeaderText
        order.channelSales.forEach(co => {
          co.category = order?.kartzhubProduct?.categories;
          let sale = this.channelsalessku.find(i => i.sku == co.sku)
          if (sale) {
            sale.quantityPurchased = sale.quantityPurchased + co.quantityPurchased;
          } else {
            this.channelsalessku.push(co)
          }
          co.warehouseLocations = order?.kartzhubProduct?.warehouseLocations;
          co.quantity = order?.kartzhubProduct?.qty;
          if (co.upc == null) {
            if(order.kartzhubProduct == null){
              co.upc = '';
            }else{
              co.upc = order.kartzhubProduct.upc;
            }
          }
          if (co.title == null) {
            
            if(order.kartzhubProduct == null){
              co.title = '';
            }else{
              co.title = order.kartzhubProduct.title;
            }
          }
          this.selectedOrderData.push(co);
        });

      }, error => {
        this.loading = false;
      })

      console.log(this.selectedOrderData_res)
      console.log(this.channelsalessku)
      // localStorage.removeItem('printpicklist');
      await this.delay(100);
      const printContents = document.getElementById("printOnly").innerHTML;
      // const originalContents = document.body.innerHTML;
      this.dbService.clear('shub').subscribe((successDeleted) => {
        //console.log('success? ', successDeleted);
      });

      document.body.innerHTML = printContents;
      this.loading = false;
      window.print();
    });




  }
  getValue(head: any, order: any) {
    switch (head.displaycolumn) {
      case 'Channel Order Id':
        return order.orderId;
        break;
      case 'Sellershub Order Id':
        return order.channelOrderId;
        break;
      // case 'Order Date':
      //   //return order.purchaseDate;
      //   // var datePipe = new DatePipe(Utills.UK_DATE);
      //   order.purchaseDate = order.purchaseDate?this.datepipe.transform(order.purchaseDate,Utills.UK_DATE):'';
      //   break;
      case 'Postal Code':
        return order.shipPostalCode;
        break;
      case 'Image':
        return order.imageUrl;
        break;
      case 'SKU':
        return order.sku;
        break;
      case 'Quantity':
        return order.quantityPurchased;
        break;
      case 'Line Cost':
        return order.itemPrice;
        break;
      case 'Bin':
        return order.location;
        break;
      case 'Item ID':
        return order.orderItemId;
        break;
      case 'Channel':
        return order.channel;
        break;
      case 'Warehouse':
        return order.warehouse;
        break;
      case 'Stock Remaining':
        return order.quantity;
        break;
      case 'Product Title':
        return order.title;
        break;
      default:
        break;
    }
  }
  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  loadTablePagenation() {
    $(function () {
      // $('#printabletable').DataTable();
      $('#printabletable').DataTable({
        responsive: true,
        fixedHeader: true,
        pagingType: "simple_numbers",
        pageLength: 10,
        lengthChange: true,
        dom: 'Bfrtip',
        buttons: [
          'copy', 'csv', 'excel', 'pdf', 'print'
        ],
        columnDefs: [
          {
            "targets": 2, // your case first column
            "className": "text-center"
          },
          {
            "targets": 3, // your case first column
            "className": "text-center"
          }
        ]
      });
      $('.buttons-copy, .buttons-csv, .buttons-print, .buttons-pdf, .buttons-excel').addClass('btn btn-primary mr-1');
    });
  }


}
