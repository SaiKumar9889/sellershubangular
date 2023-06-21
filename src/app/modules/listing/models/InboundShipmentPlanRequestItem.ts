export class InboundShipmentPlanRequestItem {
  ASIN: string;
  Condition: string;
  Quantity: number;
  SellerSKU: string;
  QuantityInCase: number;
  PrepDetailsList: {
    PrepInstruction: any,
    PrepOwner: any
} []
}
