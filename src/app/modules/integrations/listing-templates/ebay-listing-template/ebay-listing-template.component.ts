import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ToastTypes } from 'src/app/_models/_toaster';
import { DatasharingService } from 'src/app/_service/datasharing.service';
import { ToasterService } from 'src/app/_service/toaster.service';
import { EbayList } from '../../models/ebay.model';
import { EbayListService } from '../../services/ebay-list.service';
import * as dataCountry from '../../../../../assets/config/countries.json'
import { EbaySetting } from '../../models/ebay-setting';
import { EbayPolicy } from '../../models/ebay-policy';
import { ConditionalExpr } from '@angular/compiler';
// import { EmailEditorComponent } from 'angular-email-editor';
declare var $: any;


@Component({
  selector: 'app-ebay-listing-template',
  templateUrl: './ebay-listing-template.component.html',
  styleUrls: ['./ebay-listing-template.component.scss']
})
export class EbayListingTemplateComponent implements OnInit {
  // @ViewChild(EmailEditorComponent)
  // private emailEditor: EmailEditorComponent;
  @Input() isNewIntegration = false;
  @Input() channelId = 0;
  ckEditorOpen = false;
  newTemplate = false;
  content = "";
  templates: any;
  config = {
    // extraPlugins: "autogrow",
    // resize_enabled: false,
    // autoGrow_maxHeight: 200,
    // autoGrow_maxWidth: 200,
    // removePlugins: "resize"
  };
  @ViewChild("tabsebaylist") tabsscroll: ElementRef;
  tabs = { general: true, listing: false, shopping: false, pricing: false, rules: false, productattribute: false, taxdetails: false, htmldesign: false }
  loading: boolean;
  ebayList: EbayList = new EbayList();
  ebayListSetting: EbaySetting = new EbaySetting();
  ebayPolicy: EbayPolicy = new EbayPolicy();
  categoriesOpen: boolean;
  categoriesData: any;
  selectedSite: string;
  treeUpdate = false;
  @ViewChild('ckeditorObj') ckeditor: any;
  intShippingOptions: any = [];
  shippingOptions: any = [];
  countryCodes: any = [];
  isEditTemplate: boolean;
  policies: any;
  siteCheck = 'UK';
  categoryID: any;
  categoryIndex = 0;
  shippingProfiles: any;
  returnProfiles: any;
  postlistingrules: any;
  paymentProfiles: any;



  worldwide = '';
  EuropeanUnion = '';
  European = '';
  Asia = '';
  America = '';
  US = '';
  CA = '';
  IE = '';
  FR = '';
  DE = '';
  AU = '';
  JP = '';
  allCountries: any = [];
  itemSpecs: any;


  constructor(public ebayListService: EbayListService, public datasharingService: DatasharingService,
    private toasterService: ToasterService) { }

  ngOnInit(): void {
    this.getAllListingTemplates();
    //console.log(dataCountry['default']);
    this.countryCodes = dataCountry['default']
    this.allCountries = this.datasharingService.getCountries();


  }

  updateTabs(general, listing, shopping, pricing, rules, product, tax, html) {
    this.tabs.general = general;
    this.tabs.listing = listing;
    this.tabs.shopping = shopping;
    this.tabs.pricing = pricing;
    this.tabs.rules = rules;
    this.tabs.productattribute = product;
    this.tabs.taxdetails = tax;
    this.tabs.htmldesign = html;
  }

  closeEbay() {
    this.datasharingService.closeIntegrationTab();
  }

  openCKeditor() {
    this.ckEditorOpen = true;
  }

  getAllListingTemplates() {
    this.loading = true;
    if(this.channelId==undefined){
      this.loading = false;
      this.toasterService.openToastMessage(ToastTypes.warning,'', 'Before Creating the listing template you need to go for the Integration ');
    }
    else{
    this.ebayListService.getAllchannels(this.channelId).subscribe((result: any) => {
      this.templates = result;
      this.loading = false;
      //console.log(result);
    }, error => {
      this.loading = false;
    });

  }
  }


  editTemplate(item = null) {
    this.loading = true;
    this.ebayListService.getSelectedTemplate(this.channelId, item ? item.id : -1).subscribe((result: any) => {
      this.ebayList = result.ebayListingTemplate;
      this.ebayListSetting = result.ebayListingTemplate['ebaySettingPostageOption'] ? result.ebayListingTemplate['ebaySettingPostageOption'] : new EbaySetting();
      this.ebayList.shippingOptions = "Flat";
      this.ebayPolicy = result.ebayListingTemplate['ebaySettingPaymentOption'] ? result.ebayListingTemplate['ebaySettingPaymentOption'] : new EbayPolicy();
      this.intShippingOptions = result.intshippingOptions;
      this.shippingOptions = result.shippingOptions;
      this.shippingProfiles = result.shippingProfiles;
      this.returnProfiles = result.returnProfiles;
      this.postlistingrules = result.postlistingrules;
      this.paymentProfiles = result.paymentProfiles;

      this.ebayList.domesticHandlingTime = this.ebayList.domesticHandlingTime !== null ? this.ebayList.domesticHandlingTime : '1';
      this.ebayList.domesticInsurance = this.ebayList.domesticInsurance !== null ? this.ebayList.domesticInsurance : 'NotOffered';
      this.ebayList.internationalInsurance = this.ebayList.internationalInsurance !== null ? this.ebayList.internationalInsurance : 'Insurnace_Not_Offered';

      //console.log( this.ebayListSetting)
      this.newTemplate = false;
      this.isEditTemplate = true;


      this.loading = false;
      if (this.tabsscroll?.nativeElement)
        this.tabsscroll.nativeElement.scrollIntoView({ behavior: "smooth", block: "start" });
      //console.log(result);
    }, error => {
      this.loading = false;
      this.toasterService.openToastMessage(ToastTypes.warning, error.error.text, 'failed');
    });
  }
  duplicateTemplate(item = null){
    this.loading = true;
    this.ebayListService.getSelectedTemplate(this.channelId, -1).subscribe((res: any) => {
      this.ebayListService.getSelectedTemplate(this.channelId,item ? item.id : -1).subscribe((result: any) => {
      this.ebayList = result.ebayListingTemplate;
      this.ebayList.id= res?.ebayListingTemplate?.id;
      this.ebayList.templateName= result?.ebayListingTemplate?.templateName + '  Duplicate';
      this.ebayListSetting = result.ebayListingTemplate['ebaySettingPostageOption'] ? result.ebayListingTemplate['ebaySettingPostageOption'] : new EbaySetting();
      this.ebayList.shippingOptions = "Flat";
      this.ebayPolicy = result.ebayListingTemplate['ebaySettingPaymentOption'] ? result.ebayListingTemplate['ebaySettingPaymentOption'] : new EbayPolicy();
      this.intShippingOptions = result.intshippingOptions;
      this.shippingOptions = result.shippingOptions;
      this.shippingProfiles = result.shippingProfiles;
      this.returnProfiles = result.returnProfiles;
      this.postlistingrules = result.postlistingrules;
      this.paymentProfiles = result.paymentProfiles;

      this.ebayList.domesticHandlingTime = this.ebayList.domesticHandlingTime !== null ? this.ebayList.domesticHandlingTime : '1';
      this.ebayList.domesticInsurance = this.ebayList.domesticInsurance !== null ? this.ebayList.domesticInsurance : 'NotOffered';
      this.ebayList.internationalInsurance = this.ebayList.internationalInsurance !== null ? this.ebayList.internationalInsurance : 'Insurnace_Not_Offered';

      //console.log( this.ebayListSetting)
      this.newTemplate = true;
      this.isEditTemplate = false;
      console.log(this.ebayList)
      // this.ebayList.htmltext = this.ckeditor._data;
      this.ebayList.ebayUserId = this.channelId;
      // this.ebayList['ebaySettingPostageOption'] = this.ebayListSetting;
      // this.ebayList['ebaySettingPaymentOption'] = this.ebayPolicy;
      //console.log(this.ebayList);
      let data = new EbayList();
      Object.assign(data, this.ebayList);
      delete data.ebaySettingPostageOption.shipToLocations;
      delete data.ebaySettingPostageOption.shipToLocationsList;
      this.ebayListService.saveEbayTemplate(this.ebayList, this.channelId).subscribe((result: any) => {
        //console.log(result);
        this.loading = false;
        this.toasterService.openToastMessage(ToastTypes.success, 'Ebay Saved', 'success');
        this.getAllListingTemplates();
      },
        error => {
          this.loading = false;
          if (error.error.text === 'Channel template created successfully') {
            this.toasterService.openToastMessage(ToastTypes.success, error.error.text, 'success');
            this.getAllListingTemplates();
          } else {
            this.toasterService.openToastMessage(ToastTypes.warning, error.error.text, 'failed');
          }
        });

      this.loading = false;
      if (this.tabsscroll?.nativeElement)
        this.tabsscroll.nativeElement.scrollIntoView({ behavior: "smooth", block: "start" });
      //console.log(result);
    }, error => {
      this.loading = false;
      this.toasterService.openToastMessage(ToastTypes.warning, error.error.text, 'failed');
    }); 
  }, error => {
    this.loading = false;
    this.toasterService.openToastMessage(ToastTypes.warning, error.error.text, 'failed');
  }); 
  
  }

  removeTemplate(item) {
    this.ebayListService.deleteSelectedTemplate(this.channelId, item.id).subscribe((result: any) => {
      //console.log(result);
      this.getAllListingTemplates();
      this.toasterService.openToastMessage(ToastTypes.success, 'Ebay Removed', 'success');
    },
      error => {
        //console.log(error);
        if (error.error.text === 'Succeessfully removed the template') {
          this.toasterService.openToastMessage(ToastTypes.success, error.error.text, 'success');
          this.templates = this.templates.filter(template => template.id != item.id)
        } else {
          this.toasterService.openToastMessage(ToastTypes.warning, error.error.text, 'Response');
        }
      }
    );
  }
  newTemplateOpen() {
    if(this.channelId==undefined){
      this.loading = false;
      this.toasterService.openToastMessage(ToastTypes.warning,'', 'Before Creating the listing template you need to go for the Integration ');
    }
    else{
    this.ebayListService.getSelectedTemplate(this.channelId, -1).subscribe((result: any) => {
      this.ebayList = result.ebayListingTemplate;
      this.ebayList.ebaySettingPaymentOption = new EbayPolicy();
      this.ebayList.ebaySettingPostageOption = new EbaySetting();
      this.newTemplate = true;


      this.loading = false;
      if (this.tabsscroll?.nativeElement)
        this.tabsscroll.nativeElement.scrollIntoView({ behavior: "smooth", block: "start" });
      //console.log(result);
    }, error => {
      this.loading = false;
      this.toasterService.openToastMessage(ToastTypes.warning, error.error.text, 'Before Creating the listing template you need to go for the Integration ');
    });
  }
  }
  udpateCkeditor() {
    this.ckeditor._data = this.ebayList.htmltext
    //console.log(this.ebayList.htmltext)
    $('#edithtmltemplatedivid').modal('hide');
  }
  saveHtmlDesign() {
    $('#edithtmltemplatedivid').modal('hide');
  }
  openHtmlModal() {
    //console.log(this.ebayList.htmltext);
    this.ebayList.htmltext = this.ckeditor._data;
    //console.log( this.ckeditor._data)
    $('#edithtmltemplatedivid').modal('show');
  }
  saveTemplate() {
    this.loading = true;
    console.log(this.ebayList);
    this.ebayList.htmltext = this.ckeditor._data;
    this.ebayList.ebayUserId = this.channelId;
    // this.ebayList['ebaySettingPostageOption'] = this.ebayListSetting;
    // this.ebayList['ebaySettingPaymentOption'] = this.ebayPolicy;
    //console.log(this.ebayList);
    let data = new EbayList();
    Object.assign(data, this.ebayList);
    delete data.ebaySettingPostageOption.shipToLocations;
    delete data.ebaySettingPostageOption.shipToLocationsList;
    this.ebayListService.saveEbayTemplate(this.ebayList, this.channelId).subscribe((result: any) => {
      //console.log(result);
      this.loading = false;
      this.toasterService.openToastMessage(ToastTypes.success, 'Ebay Saved', 'success');
      this.getAllListingTemplates();
    },
      error => {
        this.loading = false;
        if (error.error.text === 'Channel template created successfully') {
          this.toasterService.openToastMessage(ToastTypes.success, error.error.text, 'success');
          this.getAllListingTemplates();
        } else {
          this.toasterService.openToastMessage(ToastTypes.warning, error.error.text, 'failed');
        }
      });
  }
  close() {
    this.newTemplate = false;
    this.isEditTemplate = false;
    this.ebayList = new EbayList();

  }

  shiptoLocation() {
    $('#shiptolocationonedivid').modal('show');
  }

  updateTempalte() {
    this.saveTemplate();
  }

  openCategories() {
    this.loading = true;
    if (this.categoryIndex < 3) {
      this.ebayListService.getCategories('', this.siteCheck).subscribe((result: any) => {
        //console.log(result);
        this.categoriesOpen = true;
        this.loading = false;
        this.openSubCategories(result.categoryid, this.siteCheck);
      }, error => {
        this.loading = false;
        this.toasterService.openToastMessage(ToastTypes.warning, error.error.text, 'failed');
      })
    } else {
      this.loadEbayStoreCategories('', this.channelId, '%23');
    }

  }
  openSubCategories(id, site) {
    this.loading = true;
    this.ebayListService.getSubCategories(id, site, '').subscribe((result: any) => {
      //console.log(result);
      result.map(item => { item['expand'] = false, item['level'] = 0 });
      this.categoriesData = result;
      this.treeUpdate = true;
      $('#openCategories').modal('show');
      this.loading = false;
    }, error => {
      this.loading = false;
      this.toasterService.openToastMessage(ToastTypes.warning, error.error.text, 'failed');
    })
  }

  loadEbayStoreCategories(id, channeluserid, parenttag = '') {
    this.loading = true;
    this.ebayListService.loadEbayStoreCategories(id, channeluserid, parenttag).subscribe((result: any) => {
      //console.log(result);
      result.map(item => { item['expand'] = false, item['level'] = 0 });
      this.categoriesData = result;
      this.treeUpdate = true;
      $('#openCategories').modal('show');
      this.loading = false;
    }, error => {
      this.loading = false;
      this.toasterService.openToastMessage(ToastTypes.warning, error.error.text, 'failed');
    })
  }



  downloadPolices() {
    this.ebayListService.getPolicies(this.channelId).subscribe((result: any) => {
      //console.log(result);
      this.policies = result;
      this.toasterService.openToastMessage(ToastTypes.success, "Download policies", 'Close and reopen the template for latest policies');
    }, error => {
      this.loading = false;
      this.toasterService.openToastMessage(ToastTypes.warning, error.error.text, 'failed');
    });
  }

  getItemValue(event) {
    //console.log(event);
    this.categoryID = event.id;
  }

  closeJsTree() {
    this.treeUpdate = false;
    if (this.categoryID) {
      if (this.categoryIndex == 1) {
        this.ebayList.ebayCategoryId = this.categoryID;
      } else if (this.categoryIndex == 2) {
        this.ebayList.ebayCategoryId2 = this.categoryID;
      } else if (this.categoryIndex == 3) {
        this.ebayList.ebayStoreCategoryId = this.categoryID;
      } else if (this.categoryIndex == 4) {
        this.ebayList.ebayStoreCategory2Id = this.categoryID;
      }

    }

    $('#openCategories').modal('hide');
  }
  openItemSpecs() {
    this.loading = true;
    this.ebayListService.getEbayItemSpecs(this.ebayList.id ? this.ebayList.id : -1, this.ebayList.site, this.ebayList.ebayCategoryId).subscribe((resp: any) => {
      this.itemSpecs = resp;
      $('#editattributemodal').modal('show');
      this.loading = false;
    }, error => {
      this.loading = false;
      console.log(error)
    })


  }
  setattributevalue(index) {

  }
  saveattributes() {
    let obj = {
      name: [],
      value: []
    }
    this.itemSpecs.attributes.forEach(attr => {
      obj.name.push(attr.name);
      obj.value.push(attr.value);
    });
    this.loading = true;
    this.ebayListService.saveEbayItemSpecs(this.ebayList.id, obj).subscribe((resp: any) => {

      $('#editattributemodal').modal('hide');
      this.loading = false;
    }, error => {
      this.loading = false;
      console.log(error)
    })

  }
  // called when the editor is created
  editorLoaded() {
    console.log('editorLoaded');
    // load the design json here
    // this.emailEditor.editor.loadDesign({});
  }

  // called when the editor has finished loading
  editorReady() {
    console.log('editorReady');
  }

  // exportHtml() {
  //   this.emailEditor.editor.exportHtml((data) =>
  //     console.log('exportHtml', data)
  //   );
  // }
}
