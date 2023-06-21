import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { DisplayGrid, Draggable, GridsterConfig, GridsterItem, GridType, PushDirections, Resizable } from 'angular-gridster2';
import imagesJson from '../../../../../assets/config/company_images.json';
import { InvoiceTemplatesService } from '../../services/invoice-templates.service';
declare var $: any;
interface Safe extends GridsterConfig {
  draggable: Draggable;
  resizable: Resizable;
  pushDirections: PushDirections;
}

enum Invoice_Items {
  images = 'Image',
  GeneralDetails = 'GeneralDetails',
  Total = 'Total',
  Item = 'Item',
}
@Component({
  selector: 'app-label-template',
  templateUrl: './label-template.component.html',
  styleUrls: ['./label-template.component.scss']
})
export class LabelTemplateComponent implements OnInit {

  pageSize: any = 'A4';
  options: Safe;
  isView: boolean = false;
  dashboard: Array<GridsterItem>;
  @Input() dashboard_1: Array<GridsterItem>;
  @Input() apiData: any;
  @Input() courierId: any;
  @Input() code: any;
  imageURL = 'assets/images/amazon.png';
  lableTemplate = {
    rows: []
  }
  loading: boolean = false;

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
  selectedColum: any;
  constructor(private invoiceTemplatesService: InvoiceTemplatesService) {
    this.options = {
      gridType: GridType.Fixed,
      //compactType: CompactType.None,
      margin: 2,
      outerMargin: true,
      outerMarginTop: null,
      outerMarginRight: null,
      outerMarginBottom: null,
      outerMarginLeft: null,
      useTransformPositioning: true,
      mobileBreakpoint: 640,
      minCols: 3,
      maxCols: 4,
      minRows: 20,
      maxRows: 20,
      maxItemCols: 1,
      minItemCols: 1,
      maxItemRows: 1,
      minItemRows: 1,
      maxItemArea: 2500,
      minItemArea: 1,
      defaultItemCols: 1,
      defaultItemRows: 1,

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
      scrollToNewItems: false,
      allowMultiLayer: true,
      defaultLayerIndex: 1,
      baseLayerIndex: 2,
      maxLayerIndex: 2,
    };

    this.dashboard = [

      {
        cols: 1, rows: 1, y: 0, x: 0, id: 1, layerIndex: 1, type: Invoice_Items.GeneralDetails, childs: [
          { type: 'editor', text: '', key: 'editor', id: 1, pid: 1 }
        ]
      },
      // { cols: 1, rows: 1, y: 0, x: 0, id: 1,  layerIndex: 2, type: Invoice_Items.GeneralDetails, childs: [] }
    ];
  }

  ngOnChanges(changes: SimpleChanges): void {
    // throw new Error('Method not implemented.');
  }

  getPlayerMax_on = cod => this.dashboard.reduce((a, c) => ((+a[cod]) < (+c[cod])) ? c : a)

  addItem(itemType: Invoice_Items): void {
    // this.isView=true;
    let y = this.getPlayerMax_on('y').y;
    let id = this.getPlayerMax_on('id').id;
    this.dashboard.push({ x: 0, y: y + 1, cols: 1, rows: 1, id: id + 1, type: itemType });
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
    this.getTemplate();


  }
  getTemplate() {
    this.loading = true;
    this.invoiceTemplatesService.getLabelTemplate(this.courierId, this.code).subscribe((res: any) => {
      this.loading = false;
      const template = JSON.parse(res.shippingTemplate);
      if (template && template.rows && template.rows.length > 0) {
        this.lableTemplate = template;

        this.lableTemplate.rows.forEach(row => {
          if(row.cols && row.cols.length < 4){
            row.cols.push({ fields: [], withBarcode: false })
          }
        });
      } else {
        this.lableTemplate = {
          rows: []
        };
        for (let i = 0; i < 10; i++) {
          this.lableTemplate.rows.push(
            { cols: [{ fields: [], withBarcode: false },
             { fields: [], withBarcode: false },
              { fields: [], withBarcode: false },
              { fields: [], withBarcode: false }
            ] })
        }
        this.selectedColum = this.lableTemplate.rows[0]['cols'][0];
      }
    }, error => {
      this.lableTemplate = {
        rows: []
      };
      for (let i = 0; i < 10; i++) {
        this.lableTemplate.rows.push({ cols: [{ fields: [], withBarcode: false }, { fields: [], withBarcode: false }, { fields: [], withBarcode: false }] })
      }
      this.selectedColum = this.lableTemplate.rows[0]['cols'][0];
      this.loading = false;
    });
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
    $('#label-template-modal').hide();
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
    { key: 'label', value: 'Label', type: 'label' },
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
  selectedFromAddress: any;
  selectedLabelFields: any;
  labelFields: any = [
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
    { key: '${qty!}', value: 'Quantity', type: 'field' },
    { key: '${product_image!}', value: 'Product Image', type: 'field' },
    { key: '${sku!}', value: 'Sku', type: 'field' },
    { key: '${shipping_charge!}', value: 'Shipping Charge', type: 'field' },
    { key: '${order_id!}', value: 'Order Id', type: 'field' },
    { key: '${buyer_username!}', value: 'Buyer Username (e.g eBay user id)', type: 'field' },
    { key: '${order_notes!}', value: 'This is internal order notes', type: 'field' },
    { key: '${invoice_no!}', value: 'Invoice No', type: 'field' },
    { key: '${order_date!}', value: 'Order Date', type: 'field' },
    { key: '${shipping_method!}', value: 'Shipping Service', type: 'field' },
  ];

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
    //console.log(this.dashboard);

    this.hideModal();
  }

  hideModalEditor() {
    $('#editor-modal').modal('hide');
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

  saveTemplateV2() {
    console.log(this.lableTemplate)
    this.loading = true;
    this.invoiceTemplatesService.saveLabelTemplate(this.courierId, this.lableTemplate, this.code).subscribe((res: any) => {
      this.loading = false;
    }, error => {
      this.loading = false;
    });
  }
  saveTemplateData2() {
    this.selectedTemplates.forEach(tem => {
      this.saveTemplate(tem.id);
    });
    this.hideSaveTemp();
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
  selectCell(i, j, col) {
    console.log(i + '_' + j)
  }
  editCell(i, j, col) {
    this.selectedColum = col;
    col.active = true;
    $('#label-template-modal').show();
  }
  addLabelFields() {
    console.log(this.lableTemplate)
    $('#label-template-modal').hide();
  }
}
