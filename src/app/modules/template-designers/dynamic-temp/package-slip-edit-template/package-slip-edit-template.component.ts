import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { InvoiceTemplatesService } from '../../services/invoice-templates.service';
import imagesJson from '../../../../../assets/config/company_images.json';
import { GridsterConfig, Draggable, Resizable, PushDirections, CompactType, DisplayGrid, GridsterItem, GridType } from 'angular-gridster2';
import { AngularEditorConfig } from '@kolkov/angular-editor';
interface Safe extends GridsterConfig {
  draggable: Draggable;
  resizable: Resizable;
  pushDirections: PushDirections;
}
declare var $: any;
enum Invoice_Items {
  images = 'Image',
  GeneralDetails = 'GeneralDetails',
  Total = 'Total',
  Item = 'Item',
}
@Component({
  selector: 'app-package-slip-edit-template',
  templateUrl: './package-slip-edit-template.component.html',
  styleUrls: ['./package-slip-edit-template.component.scss']
})
export class PackageSlipEditTemplateComponent implements OnInit {
  pageSize: any = 'A4';
  options: Safe;
  isView: boolean = false;
  dashboard: Array<GridsterItem>;
  // @Input() dashboard: Array<GridsterItem>;
  @Input() template: any;
  @Input() apiData: any;
  isEditorOpened: boolean = false;
  @Output() selectedChannlesForsave=new EventEmitter<any[]>();
  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: 'auto',
    minHeight: '500',
    maxHeight: '500',
    width: 'auto',
    minWidth: '0',
    translate: 'yes',
    enableToolbar: true,
    showToolbar: true,
    placeholder: 'Enter text here...',
    defaultParagraphSeparator: '',
    defaultFontName: '',
    defaultFontSize: '',
    fonts: [
      { class: 'arial', name: 'Arial' },
      { class: 'times-new-roman', name: 'Times New Roman' },
      { class: 'calibri', name: 'Calibri' },
      { class: 'comic-sans-ms', name: 'Comic Sans MS' }
    ],
    customClasses: [
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      },
    ],
    uploadUrl: 'v1/image',
    uploadWithCredentials: false,
    sanitize: true,
    toolbarPosition: 'top',
    toolbarHiddenButtons: [
      [
        'subscript',
        'superscript',
        'fontName'
      ],
      [
        'customClasses',
        'link',
        'unlink',
        'insertImage',
        'insertVideo',
        // 'removeFormat',
        'toggleEditorMode'
      ]
    ]
  };
  constructor(private invoiceTemplatesService: InvoiceTemplatesService) {
    this.options = {
      gridType: GridType.Fit,
      compactType: CompactType.None,
      margin: 2,
      outerMargin: true,
      outerMarginTop: null,
      outerMarginRight: null,
      outerMarginBottom: null,
      outerMarginLeft: null,
      useTransformPositioning: true,
      mobileBreakpoint: 640,
      minCols: 2,
      maxCols: 2,
      minRows: 6,
      maxRows: 10,
      maxItemCols: 100,
      minItemCols: 1,
      maxItemRows: 100,
      minItemRows: 1,
      maxItemArea: 2500,
      minItemArea: 1,
      defaultItemCols: 1,
      defaultItemRows: 1,
      fixedColWidth: 250,
      fixedRowHeight: 100,
      keepFixedHeightInMobile: false,
      keepFixedWidthInMobile: false,
      scrollSensitivity: 10,
      scrollSpeed: 20,
      enableEmptyCellClick: false,
      enableEmptyCellContextMenu: false,
      enableEmptyCellDrop: false,
      enableEmptyCellDrag: false,
      enableOccupiedCellDrop: false,
      emptyCellDragMaxCols: 50,
      emptyCellDragMaxRows: 50,
      ignoreMarginInRow: false,
      draggable: {
        enabled: true,
      },
      resizable: {
        enabled: true,
      },
      swap: false,
      pushItems: true,
      disablePushOnDrag: false,
      disablePushOnResize: false,
      pushDirections: { north: true, east: true, south: true, west: true },
      pushResizeItems: false,
      displayGrid: DisplayGrid.Always,
      disableWindowResize: false,
      disableWarnings: false,
      scrollToNewItems: false
    };

    // this.dashboard = [
    //   { cols: 1, rows: 1, y: 0, x: 0, id: 1, childrens: [], type: Invoice_Items.GeneralDetails, childs: [] },
    //   { cols: 1, rows: 1, y: 0, x: 1, id: 2, childrens: [], type: Invoice_Items.images, childs: [{ type: 'image', text: imagesJson.logo, key: '$logo', id: 1, pid: 2 }] },
    //   { cols: 1, rows: 1, y: 0, x: 2, id: 3, childrens: [], type: Invoice_Items.GeneralDetails, childs: [] },
    //   { cols: 1, rows: 2, y: 1, x: 0, id: 4, childrens: [], type: Invoice_Items.GeneralDetails, childs: [] },
    //   { cols: 1, rows: 2, y: 0, x: 1, id: 5, childrens: [], type: Invoice_Items.GeneralDetails, childs: [] },
    //   { cols: 1, rows: 2, y: 0, x: 2, id: 6, childrens: [], type: Invoice_Items.GeneralDetails, childs: [] },
    //   { cols: 3, rows: 4, y: 3, x: 0, id: 7, childrens: [], type: Invoice_Items.Item, childs: [] },
    //   { cols: 3, rows: 1, y: 7, x: 0, id: 8, childrens: [], type: Invoice_Items.Total, childs: [] }
    // ];
  }
  ngOnChanges(changes: SimpleChanges): void {
    // throw new Error('Method not implemented.');
    // if(this.template?.invoiceBodyText){
    //   //console.log(this.template?.invoiceBodyText);
    //   let temp=this.template?.invoiceBodyText.replace('<p>','');
    //   temp= temp.replace('</p>','');
    //   this.dashboard=JSON.parse(temp);
    // }else{
       this.dashboard = [
        {
          "cols": 1,
          "rows": 1,
          "y": 0,
          "x": 1,
          "id": 1,
          "type": "GeneralDetails",
          "childs": []
        },
        {
          "cols": 1,
          "rows": 1,
          "y": 0,
          "x": 0,
          "id": 2,
          "type": "Image",
          "childs": [
            {
              "type": "image",
              "text": "data:image/png;base64,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",
              "key": "$logo",
              "id": 1,
              "pid": 2
            }
          ]
        },
        {
          "cols": 1,
          "rows": 1,
          "y": 0,
          "x": 2,
          "id": 3,
          "type": "GeneralDetails",
          "childs": [
            {
              "type": "field",
              "text": "Order Date",
              "key": "${order_date!}",
              "id": 1,
              "pid": 3
            },
            {
              "type": "field",
              "text": "Invoice No",
              "key": "${invoice_no!}",
              "id": 2,
              "pid": 3
            }
          ]
        },
        {
          "cols": 1,
          "rows": 2,
          "y": 1,
          "x": 0,
          "id": 4,
          "type": "GeneralDetails",
          "childs": [
            {
              "type": "field",
              "text": "Shipping Name",
              "key": "${shippingname!}",
              "id": 1,
              "pid": 4
            },
            {
              "type": "field",
              "text": "Shipping Address Line One",
              "key": "${address_line1!}",
              "id": 2,
              "pid": 4
            },
            {
              "type": "field",
              "text": "Shipping Address Line Two",
              "key": "${address_line2!}",
              "id": 3,
              "pid": 4
            },
            {
              "type": "field",
              "text": "Shipping Address Line Three",
              "key": "${address_line3!}",
              "id": 4,
              "pid": 4
            },
            {
              "type": "field",
              "text": "Shipping City",
              "key": "${city!}",
              "id": 5,
              "pid": 4
            },
            {
              "type": "field",
              "text": "Shipping State/County",
              "key": "${state!}",
              "id": 6,
              "pid": 4
            },
            {
              "type": "field",
              "text": "Shipping Zip Code/Post Code",
              "key": "${postcode!}",
              "id": 7,
              "pid": 4
            },
            {
              "type": "field",
              "text": "Shipping Country",
              "key": "${country!}",
              "id": 8,
              "pid": 4
            }
          ]
        },
        {
          "cols": 1,
          "rows": 2,
          "y": 1,
          "x": 1,
          "id": 5,
          "type": "GeneralDetails",
          "childs": []
        },
        {
          "cols": 1,
          "rows": 2,
          "y": 1,
          "x": 2,
          "id": 6,
          "type": "GeneralDetails",
          "childs": [
            {
              "type": "editor",
              "text": "<div><b>From:</b></div>Company Name<div>Address Line One</div><div>Address Line One<br></div><div>City</div><div>State</div><div>Post Code</div><div>Country</div>",
              "key": "editor",
              "id": 1,
              "pid": 6
            }
          ]
        },
        {
          "cols": 2,
          "rows": 2,
          "y": 3,
          "x": 0,
          "id": 7,
          "type": "Item",
          "childs": this.selectedInvoice
        },
        {
          "cols": 2,
          "rows": 1,
          "y": 5,
          "x": 0,
          "id": 8,
          "type": "Total",
          "childs": []
        },
        // {
        //   "x": 0,
        //   "y": 6,
        //   "cols": 2,
        //   "rows": 1,
        //   "id": 9,
        //   "type": "GeneralDetails",
        //   "childs": []
        // },
        // {
        //   "x": 0,
        //   "y": 7,
        //   "cols": 2,
        //   "rows": 1,
        //   "id": 10,
        //   "type": "GeneralDetails",
        //   "childs": [
        //     {
        //       "type": "editor",
        //       "text": "<h5><b>Thank you for your business.</b></h5><div>Our terms and conditions of trade and services apply. If you have any queries please feel free to contact our customer support for more information or the copy of t&amp;c.</div>",
        //       "key": "editor",
        //       "id": 1,
        //       "pid": 10
        //     }
        //   ]
        // }
      ];
    // }
   
  }

  getPlayerMax_on = cod => this.dashboard.reduce((a, c) => ((+a[cod]) < (+c[cod])) ? c : a)

  addItem(itemType: Invoice_Items): void {
    // this.isView=true;
    let y = this.getPlayerMax_on('y').y;
    let id = this.getPlayerMax_on('id').id;
    id= id + 1
    if(itemType==Invoice_Items.images)
    this.dashboard.push({ x: 0, y: y + 1, cols: 1, rows: 1, id:id , type: itemType, childs: [{ type: 'image', text: imagesJson.logo, key: '$logo', id: id, pid: id }]});
    else
    this.dashboard.push({ x: 0, y: y + 1, cols: 1, rows: 1, id: id, type: itemType, childs: [] });
  }
  viewItems(): void {
    this.isView = true;
  }

  remove(item: any) {
    this.dashboard = this.dashboard.filter(di => di.id != item.id);
  }

  ngOnInit() {
    this.dropdownSettings_from = {
      singleSelection: false,
      idField: 'key',
      textField: 'value',
      selectAllText: 'Select All',
      unSelectAllText: 'Deselect all',
      itemsShowLimit: 100,
      enableCheckAll: true,
      allowSearchFilter: true,
      clearSearchFilter: true,
      closeDropDownOnSelection: true
    };
    this.dropdownSettings_item = {
      singleSelection: true,
      idField: 'key',
      textField: 'value',
      selectAllText: 'Select All',
      unSelectAllText: 'Deselect all',
      itemsShowLimit: 100,
      enableCheckAll: true,
      allowSearchFilter: true,
      clearSearchFilter: true,
      closeDropDownOnSelection: true
    };

    this.dropdownSettings_template = {
      singleSelection: false,
      idField: 'id',
      textField: 'name',
      selectAllText: 'Select All',
      unSelectAllText: 'Deselect all',
      itemsShowLimit: 100,
      enableCheckAll: true,
      allowSearchFilter: true,
      clearSearchFilter: true,
      closeDropDownOnSelection: true
    };


  }

  itemChange(event: any) {
    //console.log(event);
    //console.log(this.dashboard);
  }

  activeitem: any;
  activetype: any = '';
  openModal(item: any, address?: any) {
    this.selectedFromAddress = [];
    $('#template-modal').modal('show');
    this.activeitem = item;
    this.activetype = address;
  }

  hideModal() {
    $('#template-modal').modal('hide');
  }

  addImage() {
    $('#img-upload').click();
  }

  changeFiles(event: any) {
    //console.log(event.target.files);
    this.generateImageObject(event.target.files[0]);
    //console.log(this.dashboard);
    this.hideModal();
  }

  generateImageObject(file) {
    this.getBase64(file).then(
      data => {
        //console.log(data);
        this.activeitem.childrens.push({ type: "image", file: data });
      }
    );
  }

  getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }

  generateLabel(text) {
    return { type: "label", text: text };
  }
  generateTextArea(text) {
    return { type: "notes", text: text };
  }
  addlabel() {
    this.activeitem.childrens.push(this.generateLabel('test'));
    this.hideModal();
  }

  addTextArea() {
    this.activeitem.childrens.push(this.generateTextArea('test'));
    this.hideModal();
  }

  proceedToPayment() {
    window.print();
  }
  dropdownSettings_from: any = {};
  allFromAddressFields: any = [
    { key: 'editor', value: 'Text Editor', type: 'editor' },
    // { key: 'label', value: 'Label', type: 'label' },
    { key: '${shippingname!}', value: 'Shipping Name', type: 'field' },
    { key: '${address_line1!}', value: 'Shipping Address Line One', type: 'field' },
    { key: '${address_line2!}', value: 'Shipping Address Line Two', type: 'field' },
    { key: '${address_line3!}', value: 'Shipping Address Line Three', type: 'field' },
    { key: '${city!}', value: 'Shipping City', type: 'field' },
    { key: '${state!}', value: 'Shipping State/County', type: 'field' },
    { key: '${postcode!}', value: 'Shipping Zip Code/Post Code', type: 'field' },
    { key: '${country!}', value: 'Shipping Country', type: 'field' },
    { key: '${ebay_record_number!}', value: 'eBay Order Record Number', type: 'field' },
    { key: '${total_price!}', value: 'Total Order Price', type: 'field' },
    { key: '${qty_sku_list!}', value: 'Quantity/SKU list', type: 'field' },
    { key: '${shipping_charge!}', value: 'Shipping Charge', type: 'field' },
    { key: '${order_id!}', value: 'Order Id', type: 'field' },
    { key: '${royalmail_ppi!}', value: 'Royal Mail PPI Image', type: 'field' },
    { key: '${checkout_message!}', value: 'Checkout Buyer Message', type: 'field' },
    { key: '${buyer_username!}', value: 'Buyer Username (e.g eBay user id)', type: 'field' },
    { key: '${order_notes!}', value: 'This is internal order notes', type: 'field' },
    { key: '${invoice_no!}', value: 'Invoice No', type: 'field' },
    { key: '${order_date!}', value: 'Order Date', type: 'field' },
    { key: '${shipping_method!}', value: 'Shipping Service', type: 'field' },
  ];

  allInvoiceDetails: any = [
    { key: 'Product', value: 'Product', type: 'Product' },
    { key: 'SKU', value: 'SKU', type: 'SKU' },
    { key: 'Title', value: 'Title', type: 'Title' },
    { key: 'Qty', value: 'Qty', type: 'Qty' },
    { key: 'Item Price', value: 'Item Total', type: 'Item Total' }
  ];
  selectedFromAddress: any;
  selectedInvoice:any=[{ key: 'Title', value: 'Title'},{ key: 'Item Price', value: 'Item Total'}];
  // dropdownSettings_to: any = {};
  // allToFields: any = this.allFromAddressFields;
  // selectedToAddress: any;

  // dropdownSettings_totalitems: any = {};
  // alltotalitemsFields: any = this.allFromAddressFields;
  // selectedtotalitems: any;

  // dropdownSettings_invoiceinfo: any = {};
  // allInvoiceFields: any =this.allFromAddressFields;
  // selectedinvoiceFields: any;


  // dropdownSettings_table: any = {};
  // alltableFields: any =this.allFromAddressFields;
  // selectedtableFields: any;
  dropdownSettings_template: any = {};
  selectedTemplates: any[] = [];

  dropdownSettings_item: any = {};
  allCardTypes: any = [
    { key: 'Image', value: 'Image' },
    { key: 'GeneralDetails', value: 'General Details' },
    { key: 'Total', value: 'Total Details' },
    { key: 'Item', value: 'Item Details' }
  ];
  selectedCards: any = [];

  addFields() {
    if (this.activetype == 'itemcard') {
      if (this.selectedCards.length == 0) {
        return;
      }
      this.addItem(this.selectedCards[0].key);
    }
    if (this.activetype == 'fromaddress') {
      this.selectedFromAddress.forEach(it => {
        let sKey = this.allFromAddressFields.find(itf => itf.key === it.key);
        let id = this.activeitem.childs.length + 1;
        if (sKey.type != 'label')
          this.activeitem.childs.push({ type: sKey.type, text: it.value, key: it.key, id: id, pid: this.activeitem.id });
        else
          this.activeitem.childs.push({ type: sKey.type, text: imagesJson.logo, key: it.key, id: id, pid: this.activeitem.id });

      });
    }
    if (this.activetype == 'itemdetails') {     
      this.activeitem.childs=this.selectedInvoice;
    }
    console.log(this.dashboard);

    this.hideModal();
  }

  hideModalEditor() {
    $('#editor-modal').modal('hide');
    this.isEditorOpened=false;
  }

  activeEditorItem: any;
  selectedChails: any;
  selectedHtml: any;
  openEditor(item: any, event: any) {
    //console.log('openEditor', event);
    // //console.log(item);
    this.selectedChails = event?.chaild;
    this.selectedHtml = event?.chaild?.text;
    this.activeEditorItem = item;
    this.isEditorOpened=true;
    $('#editor-modal').modal('show');
  }
  saveEditorData() {
    //console.log('editorCodehtml', this.selectedHtml);
    this.selectedChails.text = this.selectedHtml;
    //console.log(this.selectedChails);
    //console.log(this.dashboard);
    this.hideModalEditor();
    this.selectedHtml = '';
  }
  emithtml(event) {
    //console.log(this.selectedHtml);
    //console.log('editorCodehtml', event.target.innerHTML);
    //console.log('editorCodehtml', event.target.innerText);
    this.selectedHtml = event.target.innerHTML;
  }
  // editorCode(event: any) {
  //   //console.log(event.target.value);
  // }

  // editorCodehtml(event: any) {
  //   //console.log('editorCodehtml',this.selectedHtml);
  //   this.selectedChails.text=this.selectedHtml;
  // }

  backtobuilder() {
    this.isView = false;
  }
  loading: boolean = false;

  saveTemplateV2() {
    $('#savetemplate-modal').modal('show');
  }
  saveTemplateData2() {
    this.selectedTemplates.forEach(tem => {
      this.saveTemplate(tem.id);
    });
    this.hideSaveTemp();
    this.hideSaveTemp();
  }
  onDropDownClose(){
    this.selectedChannlesForsave.emit(this.selectedTemplates);
  }
  saveTemplate(channelid) {
    let body = {
      "channelId": channelid,
      "invoiceAddressText": "",
      "invoiceBodyText": JSON.stringify(this.dashboard),
      "invoiceFooterText": "",
      "invoiceHeaderText": "",
      "invoicePrinter": "",
      "labelFooterText": "",
      "labelHeaderText": "",
      "labelHeight": 0,
      "labelPrinter": "",
      "labelWidth": 0,
      "numberofLabelsPerSheet": "",
      "showTaxAmount": true,
      "showimage": true,
      "showitem": true,
      "showsku": true,
      "showvariations": true,
      "taxAmount": 0
    };
    this.loading = true;
    this.invoiceTemplatesService.saveTemplate(body).subscribe((res: any) => {
      this.loading = false;
    }, error => {
      this.loading = false;
    });
  }
  hideSaveTemp() {
    $('#savetemplate-modal').modal('hide');
  }
}
