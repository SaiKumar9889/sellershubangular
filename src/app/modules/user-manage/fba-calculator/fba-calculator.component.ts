import { Component, OnInit, SimpleChanges } from '@angular/core';
import { DatasharingService } from 'src/app/_service/datasharing.service';

@Component({
  selector: 'app-fba-calculator',
  templateUrl: './fba-calculator.component.html',
  styleUrls: ['./fba-calculator.component.scss']
})
export class FbaCalculatorComponent implements OnInit {
  country: any[] = [];
  selectedCountryvalue: string = 'GB';
  saleprice: number = 10;
  salePrice: number = 10;
  deliverCharge: number = 0;
  delivercharge: number = 0;
  referFee: number = 0;
  referfee: number = 0;
  referalpercent: number = 15.3;
  referalPercent: number = 15.3;
  peritemfee: number = 0;
  peritemFee: number = 0;
  closingfee: number = 0;
  closingFee: number = 0;
  amazonfee: number = 0;
  amazonFee: number = 0;
  labour: number = 0;
  packingmat: number = 0;
  disptocust: number = 0;
  custserv: number = 0;
  fulfilmentcost: number = 0;
  fulfilmentCost: number = 0;
  storagecost: number = 0;
  storageCost: number = 0;
  othercost: number = 0;
  otherCost: number = 0;
  vat: number = 20;
  purchasevat: number = 20;
  deliveryvat: number = 20;
  VAT: number = 20;
  purchaseVAT: number = 20;
  costofgoods: number = 0;
  costOfGoods: number = 0;
  costofgoodspercent: number = 0;
  costOfGoodsPercent: number = 0;
  miscellaneouscost: number = 0;
  miscellaneousCost: number = 0;
  paymentfee: number = 0;
  paymentFee: number = 0;
  monthlycost: number = 0;
  monthlyCost: number = 0;
  averageinventory: number = 0;
  averageInventory: number = 0;
  monthlyunits: number = 0;
  storagecostunit: number = 0;
  totalsalesprice: number = 0;
  totalSalesPrice: number = 0;
  vatpercent: number = 0;
  vatPercent: number = 0;
  purchasevatpercent: number = 0;
  deliveryvatpercent: number = 0;
  purchaseVatPercent: number = 0;
  sprice: number = 0;
  sPrice: number = 0;
  estvat: number = 0;
  estVAT: number = 0;
  estvatonpurchase: number = 0;
  estvatondelivery: number = 0;
  estVATOnPurchase: number = 0;
  estcostperunit: number = 0;
  estCostPerUnit: number = 0;
  netprofitperunit: number = 0;
  netProfitPerUnit: number = 0;
  estsales: number = 1;
  estSales: number = 1;
  netprofit: number = 0;
  netProfit: number = 0;
  netPercent: number = 0;
  netpercent: number = 0;
  netmargin: number = 0;
  netMargin: number = 0;
  vatelements: number = 0;
  vatElements: number = 0;
  fbafulfilmentfee: number = 0;
  servcaddon: number = 0;
  opaquebagging: number = 0;
  tape: number = 0;
  label: number = 0;
  bagging: number = 0;
  bubblewrap: number = 0;
  dispatch: number = 0;
  constructor(private datasharingService: DatasharingService) { }

  ngOnInit(): void {
    this.country = this.datasharingService.getCountries();
    this.totalsalesprice = (this.saleprice);
    this.referFee = ((this.totalsalesprice * (this.referalpercent) / 100));
    this.vatpercent = (1 + this.vat / 100);
    this.purchasevatpercent = (this.purchasevat / 100);
    this.deliveryvatpercent = (this.deliveryvat / 100);
    this.sprice = (this.saleprice / (this.vatpercent));
    this.estvat = (this.saleprice - this.sprice);
    this.costofgoodspercent = (this.costofgoods / this.purchasevatpercent);
    this.estvatonpurchase = (this.costofgoods * this.purchasevatpercent);
    this.estvatondelivery = (this.deliverCharge * this.deliveryvatpercent);
    this.vatelements = (this.estvat - this.estvatonpurchase);
    this.netpercent = (this.totalsalesprice / 100);
    this.amazonfee = (this.referFee + this.peritemfee + this.closingfee);
    this.fulfilmentcost = (this.deliverCharge + this.packingmat + this.disptocust + this.custserv + this.paymentfee);
    this.storagecost = (this.monthlycost * this.averageinventory);
    this.othercost = (this.costofgoods + this.miscellaneouscost);
    this.estcostperunit = (this.othercost + this.storagecost + this.fulfilmentcost + this.amazonfee + this.vatelements);
    this.netprofitperunit = (this.totalsalesprice - this.estcostperunit);
    this.netprofit = (this.estsales * this.netprofitperunit);
    this.netmargin = (this.netprofitperunit / this.netpercent);

    this.totalSalesPrice = (this.salePrice);
    this.referfee = ((this.totalsalesprice * (this.referalPercent) / 100));
    this.vatPercent = (1 + this.VAT / 100);
    this.sPrice = (this.salePrice / (this.vatPercent));
    this.estVAT = (this.salePrice - this.sPrice);
    this.purchaseVatPercent = (this.purchaseVAT / 100);
    // this.costOfGoodsPercent =(this.costOfGoods/this.purchaseVatPercent);
    this.estVATOnPurchase = (this.costOfGoods * this.purchaseVatPercent);
    this.vatElements = ((this.estvat + this.estvatondelivery) - this.estVATOnPurchase);
    this.netPercent = (this.totalSalesPrice / 100);
    this.amazonFee = (this.referfee + this.peritemFee + this.closingFee);
    // this.fulfilmentCost = (this.labour + this.packingmat + this.disptocust + this.custserv + this.paymentfee);
    this.storageCost = (this.monthlyCost * this.averageInventory);
    this.otherCost = (this.costOfGoods + this.miscellaneousCost);
    this.estCostPerUnit = (this.otherCost + this.storageCost + this.fulfilmentCost + this.amazonFee + this.vatelements);
    this.netProfitPerUnit = (this.totalSalesPrice - this.estCostPerUnit);
    this.netProfit = (this.estSales * this.netProfitPerUnit);
    this.netMargin = (this.netProfitPerUnit / this.netPercent);
    //  this.referFee = this.referFee.toFixed(2);
    //  this.referfee = this.referfee.toFixed(2);
  }
  onFulfilment() {
    this.totalsalesprice = this.saleprice;
    this.referFee = ((this.totalsalesprice * (this.referalpercent) / 100));
    this.netpercent = (this.totalsalesprice / 100);
    this.amazonfee = (this.referFee + this.peritemfee + this.closingfee);
    this.fulfilmentcost = (this.deliverCharge + this.packingmat + this.disptocust + this.custserv + this.paymentfee);
    this.storagecost = (this.monthlycost * this.averageinventory);
    this.vatpercent = (1 + this.vat / 100);
    this.sprice = (this.saleprice / (this.vatpercent));
    this.estvat = (this.saleprice - this.sprice);
    this.purchasevatpercent = (this.purchasevat / 100);
    this.deliveryvatpercent = (this.deliveryvat / 100);
    // this.costofgoodspercent =(this.costofgoods/(this.purchasevatpercent));
    this.estvatonpurchase = (this.costofgoods * (this.purchasevatpercent));
    this.estvatondelivery = (this.deliverCharge * this.deliveryvatpercent);
    this.vatelements = ((this.estvat + this.estvatondelivery) - this.estvatonpurchase);
    this.othercost = (this.costofgoods + this.miscellaneouscost);
    this.estcostperunit = (this.othercost + this.storagecost + this.fulfilmentcost + this.amazonfee + this.vatelements);
    this.netprofitperunit = (this.totalsalesprice - this.estcostperunit);
    this.netprofit = (this.estsales * this.netprofitperunit);
    this.netmargin = (this.netprofitperunit / this.netpercent);
    // this.referFee = this.referFee.toFixed(2);
    // this.peritemfee = this.peritemfee.toFixed(2);
    // this.closingfee = this.closingfee.toFixed(2);

  }
  onAmazonFulfilment() {
    this.totalSalesPrice = (this.salePrice);
    this.referfee = ((this.totalsalesprice * (this.referalPercent) / 100));
    this.vatPercent = (1 + this.VAT / 100);
    this.sPrice = (this.salePrice / (this.vatPercent));
    this.estVAT = (this.salePrice - this.sPrice);
    this.amazonFee = (this.referfee + this.peritemFee + this.closingFee);
    // this.fulfilmentCost = (this.labour + this.packingmat + this.disptocust + this.custserv + this.paymentfee);
    this.storageCost = (this.monthlyCost * this.averageInventory);
    this.otherCost = (this.costOfGoods + this.miscellaneousCost);
    this.estCostPerUnit = (this.otherCost + this.storageCost + this.fulfilmentCost + this.amazonFee);
    this.netProfitPerUnit = (this.totalSalesPrice - this.estCostPerUnit);
    this.netProfit = (this.estSales * this.netProfitPerUnit);
    this.netPercent = (this.totalSalesPrice / 100);
    this.netMargin = (this.netProfitPerUnit / this.netPercent);
    // this.referfee = this.referfee.toFixed(2);
    // this.peritemFee = this.peritemFee.toFixed(2);
    // this.closingFee = this.closingFee.toFixed(2);
    this.purchaseVatPercent = (1 + this.purchaseVAT / 100);
    this.costOfGoodsPercent = (this.costOfGoods / (this.purchaseVatPercent));
    this.estVATOnPurchase = (this.costOfGoods - this.costOfGoodsPercent);
    this.vatElements = (this.estVAT + this.estVATOnPurchase);
  }
}
