import { Component, Input, OnInit } from '@angular/core';
import { CreateProductService } from '../services/create-product.service';
import Stepper from 'bs-stepper';
import { ToastTypes } from 'src/app/_models/_toaster';
import { DatasharingService } from 'src/app/_service/datasharing.service';
import { ToasterService } from 'src/app/_service/toaster.service';
import { environment } from 'src/environments/environment';
import { ProductsService } from '../services/products.service';
import { SalsesOrdersService } from '../../orders/services/salses-orders.service';
declare var $:any;
import Swal from 'sweetalert2';

@Component({
  selector: 'app-composition-products',
  templateUrl: './composition-products.component.html',
  styleUrls: ['./composition-products.component.scss']
})
export class CompositionProductsComponent implements OnInit {


  @Input() sku;
  @Input() totlQty;
  @Input() productId;
  allProducts: any = [];
  selectedProducts: any = [];

  page: number = 0;
  collectionsize = environment.defaultTotalValue;
  pageSize = environment.defaultPaginationValue;
  total = environment.defaultTotalValue;
  searchValue: any = '';
  searchBy: any = 0;
  searchFrom: any = '';
  searchTo: any = '';
  channelType: any = 'all';
  fliter: any = '0';
  showParentProducts:boolean=false;
  showZeroProducts:boolean=true;
  searchname: any = '0';
  searchValue2: any = '';
  loading: boolean;
  allProducts_m: any;
  title = '';
  skuip = '';

  constructor( private toasterService: ToasterService, private productService: ProductsService, private salsesOrdersService: SalsesOrdersService) { }

  ngOnInit(): void {
    this.selectedProducts = [];
    this.loading = true;
    const ids = [this.productId];
    this.productService.compositeProducts(this.productId).subscribe((res: any) => {
      this.selectedProducts = res;
      this.selectedProducts.forEach(p => {
        p['productId']=p.id;
      });
      this.loading = false;
    });
  }

  modalclosed() {
    $('#simpleProd-modal').modal('hide');
  }
  changespage(event: any) {
    this.getAllSimpleProducts();
  }
  getAllSimpleProducts() {
    this.loading = true;
    this.productService.getBundleProdusModal(this.productId, this.page, this.collectionsize, this.pageSize, this.title, this.skuip, true).subscribe((res: any) => {
      this.collectionsize = res?.page?.totalResults;
      this.allProducts = res?.products;
      this.allProducts_m = res?.products;
      this.allProducts.map(ap => ap.selected = false);
      this.loading = false;
    }, error => {
      this.loading = false;
      this.toasterService.openToastMessage(ToastTypes.warning, 'SellersHub', 'Error');
    });
    // this.productService.getProducts(this.page, this.collectionsize, this.pageSize, this.channelType, this.fliter, this.searchname, this.searchValue2, 'all', 'all', 'all_supplier',
    // this.showParentProducts, false, this.showZeroProducts,
    // false ).subscribe((res: any) => {
    //   this.collectionsize = res?.page?.totalResults;
    //   this.allProducts = res?.products;
    //   this.allProducts_m = res?.products;
    //   this.allProducts.map(ap => ap.selected = false);
    //   this.loading = false;
    // }, error => {
    //   this.loading = false;
    //   this.toasterService.openToastMessage(ToastTypes.warning, 'SellersHub', 'Error');
    // });
  }

  saveSelectedProd(){
    this.allProducts.filter(ap => ap.selected == true).forEach(prod => {
      if(!this.selectedProducts.find(p => p.id == prod.id)){
       let p =JSON.parse(JSON.stringify(prod));
        p['productId']=p.id;
        p.id= null;
       this.selectedProducts.push(p);
      }
    })
    console.log(this.selectedProducts)
  }

  isSelectAll: boolean = false;
  checkAll() {
    this.isSelectAll = !this.isSelectAll;
    this.allProducts.map(ap => ap.selected = this.isSelectAll);
  }
  refresh() {
    this.getAllSimpleProducts();
  }
  reset() {
    this.fliter = '0';
    this.channelType = 'all';
    this.searchname = '0';
    this.searchValue2 = '';
    this.getAllSimpleProducts();
  }

  async openProductsModal() {
    await this.getChannelRegistration();
    this.getAllSimpleProducts();
    $('#search-modal').modal('show');
  }

  channels: any = [];
  async getChannelRegistration() {
    this.salsesOrdersService.getChannelRegistration().subscribe(res => {
      // ////console.log(res);
      this.channels = res;
    }, error => {
      this.loading = false;
    })
  }
  changesSelected(prod: any, event) {
    if(event.target.checked){
      prod.selected = true;
    }else{
      prod.selected = false;
    }
  }

  validateAssignQty(prod){
    if(prod.qty * prod.asQty > prod.avQty){
      prod.qty =  Math.trunc(prod.avQty/prod.asQty);
    }
  }
  validateQty(prod){
    if(!prod.qty){ return }
    if(prod.qty * prod.asQty > prod.avQty){
      this.toasterService.openToastMessage(ToastTypes.warning, 'Composit product', 'Quantity should not exceed '+Math.trunc(prod.avQty/prod.asQty));;
    }
  }

  save(){
    let totalQty = 0;

  }

  updateBulkQty(prod){
    let body = {
      "productIds": [prod.childId],
      "qtyList": [prod.qty]
    }
    this.loading=true;
    this.productService.updateSaveBundleChailsItems(this.productId , body).subscribe((res: any) => {
      //console.log(res);
      this.loading=false;
      this.toasterService.openToastMessage(ToastTypes.success, 'Products', 'Product qty updated');
     // this.closeModalbqty();
    });
  }

  updateQty(prod: any) {
    ////console.log(prod);
    Swal.fire({
      title: 'Are you sure?',
      text: "You want to update the qty !",
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, do it!'
    }).then(async (result) => {
      ////console.log(result);
      if (result?.value) {
        this.productService.updateProductQty(prod.sku, prod.qty, prod.sellingPrice?prod.sellingPrice: 0.0).subscribe(res => {

          Swal.fire(
            'Products!',
            'update qty is done.',
            'success'
          )
        });
      }
    });
  }


  linkedProds: any = [];
  linkProducts() {
    this.linkedProds = [];
    let selectedOrders = this.allProducts.filter(down => down.selected == true);
    const ids = selectedOrders.map(ord => ord.id);

    if (ids.length == 0) {
      this.toasterService.openToastMessage(ToastTypes.warning, 'Products', 'Please select one product atleast');
      return;
    }
    this.productService.linkProducts(ids).subscribe((res: any) => {
      ////console.log(res);
      this.linkedProds = res?.kartzhubProducts;

    });
  }
  confirmLinkProduct() {
    Swal.fire({
      title: 'Are you sure?',
      text: "You want to create composition !",
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, do it!'
    }).then(async (result) => {
      ////console.log(result);
      if (result?.value) {
        const ids = []
        const qtys = []
        this.selectedProducts.forEach(prod => {
          ids.push(prod.productId);
        qtys.push(prod.qty)
      });
        let data = {
          parentId: this.productId,
          childIds : ids,
          qtys : qtys
        }

        this.productService.saveComposition(data).subscribe(res => {
          this.toasterService.openToastMessage(ToastTypes.success, 'Products', 'Product composition added');

        });

      }
    });
  }
  confirmUnLinkProduct(prod) {


  }
  remove(prod){
    if(prod.id){
      const ids = [this.productId, prod.id]
      this.productService.removecompositeProducts(this.productId, prod.productId).subscribe(res => {
        this.toasterService.openToastMessage(ToastTypes.success, 'Products', 'Product composition removed');
        this.selectedProducts = this.selectedProducts.filter(p => p.productId != prod.productId)
      });
    } else {
      this.selectedProducts = this.selectedProducts.filter(p => p.productId != prod.productId)
    }
  }
  updateThqtystatus(){

    const ids = [this.productId]
    this.selectedProducts.forEach(prod => ids.push(prod.productId));
    let qparam='';
    ids.forEach((id,index)=>{
      if(index==0)
      qparam=qparam+'productIds='+id;
      else
      qparam=qparam+'&productIds='+id;
    });
    this.productService.equalizeTheQty(qparam).subscribe((res:any)=>{
      this.linkedProds = res;
      this.toasterService.openToastMessage(ToastTypes.success, 'Products', 'Equal Qty applied');
      return;
    })
  }
}

