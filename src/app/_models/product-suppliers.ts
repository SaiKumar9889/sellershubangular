export interface ProductSuppliers {
  defaultSupplier: string;
  name: string;
  supplierCode: string;
  barcode: string;
  leadTime: string;
  currency: string;

  id: number;
  kartzhubUserId: number;
  sku: string;
  supplierSku: string;
  supplierId: string;
  qty: number;
  title: string;
  imageUrl: string;
  costPrice: string;
  minValue: number;
  maxValue: number;
  modifiedDate: any;

  packSize: number;
  isDefault:boolean;
  selectedCurrency: any;

  cortonSize: number;
  palletQty: number;
  vat: string;
  miscNotes: string;
  khubProductId: any;
  lineTotalPrice: any;
  orderHeaderId: any;
  orderLineStatus: any;
  productLineDetailsJSON: any;
  taxPercentage:number;
  stockReceivedDate: any;
  receivedQty: any;
  remarks: any;
  taxPrice:number;




}
