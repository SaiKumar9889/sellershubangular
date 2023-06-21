export class CreateInboundShipmentPlanRequest {
  InboundShipmentPlanRequestItems: Array<any> = [];
  LabelPrepPreference: string;
    ShipFromAddress: {
      AddressLine1: string;
      City: string;
      CountryCode: string;
      Name: string;
      PostalCode: string;
      StateOrProvinceCode: string;
      AddressLine2: string;
      DistrictOrCounty: string;
  };
  ShipToCountryCode: string;
  ShipToCountrySubdivisionCode: string;
}
