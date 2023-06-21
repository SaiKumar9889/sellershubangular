import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SalsesOrdersService {

  refreshEvent: BehaviorSubject<string> = new BehaviorSubject('');

  getPrinters() {
    let authToken = localStorage.getItem("userToken");
    return this.http.post<any[]>(
      environment.getPrinters ,{
      },
      { headers: new HttpHeaders().set("Authorization", authToken) }
    );
  }

  createPrintjob(data) {
    let authToken = localStorage.getItem("userToken");
    return this.http.post<any[]>(
      environment.createPrintjob ,data,
      { headers: new HttpHeaders().set("Authorization", authToken) }
    );
  }

  constructor(private http: HttpClient) { }
  getSalesOrders(pageno: number, total: number, pagesize: number, channel: any, sortvalue: number, searchname: string, searchvalue: string, shipCountryCode: string, type: string, showOrders: boolean, orderValue: number, shippingMethod: string,splitOrderItem:any, isOrdersView = false) {
    let authToken = localStorage.getItem("userToken");
    let baseUrl = !isOrdersView ? environment.order_getSalesOrders : environment.dynamicSearchOrders
    return this.http.get<any[]>(
      baseUrl + `?pageno=${pageno}&total=${total}&pagesize=${pagesize}&channel=${channel}&sortvalue=${sortvalue}&searchname=${searchname}&searchvalue=${searchvalue}&shipCountryCode=${shipCountryCode}&type=${type}&showOrders=${showOrders}&orderValue=${orderValue}&shippingMethod=${shippingMethod}&splitOrderItem=${splitOrderItem}`,
      { headers: new HttpHeaders().set("Authorization", authToken) }
    );
  }

  downloadordersfromchannels() {
    let authToken = localStorage.getItem("userToken");
    return this.http.get<any[]>(
      environment.downloadordersfromchannels,
      { headers: new HttpHeaders().set("Authorization", authToken) }
    );
  }
  savedownloadordersfromchannels(options: any, duration: any) {
    let authToken = localStorage.getItem("userToken");
    return this.http.post<any[]>(
      environment.applydownloadordersfromchannelid + '?duration=' + duration + '&downloadorders=1', { "ids": options },
      { headers: new HttpHeaders().set("Authorization", authToken) }
    );
  }
  addShippingMethod(id: any, method: any) {
    let authToken = localStorage.getItem("userToken");
    return this.http.get<any[]>(
      environment.add_shippingmethod + `?id=${id}&shipingMethod=${method}`,
      { headers: new HttpHeaders().set("Authorization", authToken) }
    );
  }
  getOrderDetailsBasedOnOrderID(orderid: any, type = '') {
    let authToken = localStorage.getItem("userToken");
    return this.http.get<any[]>(
      environment.orderDetailsBasedonOrderID + '?orderid=' + orderid+'&type='+type,
      { headers: new HttpHeaders().set("Authorization", authToken) }
    );
  }
  getDetailsBasedOnId(orderid: any,type:any) {
    let authToken = localStorage.getItem("userToken");
    return this.http.get<any[]>(
      environment.orderDetailsBasedonOrderID + '?id=' + orderid + '&type=' + type,
      { headers: new HttpHeaders().set("Authorization", authToken) }
    );
  }
  searchOrderTrackingId(orderid: any, type = 1) {
    let authToken = localStorage.getItem("userToken");
    return this.http.get<any[]>(
      environment.searchOrderTrackingId + '?orderid=' + orderid+'&type='+type,
      { headers: new HttpHeaders().set("Authorization", authToken) }
    );
  }
  confirmorderpayment(options: any) {
    let authToken = localStorage.getItem("userToken");
    return this.http.post<any[]>(
      environment.confirmorderpayment, { "ids": options },
      { headers: new HttpHeaders().set("Authorization", authToken) }
    );
  }
  orderProcess(options: any) {
    let authToken = localStorage.getItem("userToken");
    return this.http.post<any[]>(
      environment.orderProcess, { "ids": options },
      { headers: new HttpHeaders().set("Authorization", authToken) }
    );
  }
  bulkemail(options: any) {
    let authToken = localStorage.getItem("userToken");
    return this.http.post<any[]>(
      environment.bulkemail, { "ids": options },
      { headers: new HttpHeaders().set("Authorization", authToken) }
    );
  }

  findOrdercancel(options: any[]) {
    // ,params: new HttpParams().set("ids",options)
    let authToken = localStorage.getItem("userToken");
    return this.http.get<any[]>(
      environment.orderDetailsBasedonOrderID + '?orderId=' + options,
      { headers: new HttpHeaders().set("Authorization", authToken) }
    );
  }
  findOrderForcancel(options: any) {
    // ,params: new HttpParams().set("ids",options)
    let authToken = localStorage.getItem("userToken");
    return this.http.post<any[]>(
      environment.BASE_URL + environment.findOrdercancel + '?orderId=' + options,
      { headers: new HttpHeaders().set("Authorization", authToken) }
    );
  }
  cancelOrder(options: any) {
    // ,params: new HttpParams().set("ids",options)
    let authToken = localStorage.getItem("userToken");
    return this.http.post<any[]>(
      environment.cancelorder + "?addstockback=true", options,
      { headers: new HttpHeaders().set("Authorization", authToken) }
    );
  }
  getEmailInfo(options: any) {
    let authToken = localStorage.getItem("userToken");
    return this.http.post<any[]>(
      environment.bulkemail, { "ids": options },
      { headers: new HttpHeaders().set("Authorization", authToken) }
    );
  }
  sendEmailBulk(orderid: any, attachLabel: any, dontShowPrices: any, includeOrderConfirmationCallbackUrl: any, invoiceOnly: any) {
    let authToken = localStorage.getItem("userToken");
    let qparam = '?';
    orderid.forEach((ordid, index) => {
      if (index == 0)
        qparam = qparam + 'orderid=' + ordid;
      else
        qparam = qparam + '&orderid=' + ordid;
    });
    // qparam=
    return this.http.post<any[]>(
      environment.sendEmailConfirm + qparam, {
      "attachLabel": attachLabel,
      "dontShowPrices": dontShowPrices,
      "includeOrderConfirmationCallbackUrl": includeOrderConfirmationCallbackUrl,
      "invoiceOnly": invoiceOnly
    },
      { headers: new HttpHeaders().set("Authorization", authToken) }
    );
  }
  mergeOrder(options: any[]) {
    let authToken = localStorage.getItem("userToken");
    let queryparam = '?';
    options.forEach((opt, index) => {
      if (index == 0)
        queryparam = queryparam + 'ordersIds=' + opt;
      else
        queryparam = queryparam + '&ordersIds=' + opt;
    })
    return this.http.post(
      environment.mergeOrder + queryparam, '',
      { headers: new HttpHeaders().set("Authorization", authToken), responseType: 'text' }
    );
  }

  unmergeOrder(options: any) {
    let authToken = localStorage.getItem("userToken");
    let queryparam = '?channelOrderId=' + options;
    return this.http.post<any[]>(
      environment.mergeOrder + queryparam, '',
      { headers: new HttpHeaders().set("Authorization", authToken) }
    );
  }

  getOrderItemsForSpli(orderid: any) {
    let authToken = localStorage.getItem("userToken");
    return this.http.get<any[]>(
      environment.splitOrder_Orderitems + '?orderId=' + orderid,
      { headers: new HttpHeaders().set("Authorization", authToken) }
    );
  }

  splitOrder(parentOrderId: any, orderItemIds: any) {
    let authToken = localStorage.getItem("userToken");
    let queryparam = '?parentOrderId=' + parentOrderId + '&orderItemIds=' + orderItemIds;
    return this.http.post<any[]>(
      environment.splitOrder + queryparam, '',
      { headers: new HttpHeaders().set("Authorization", authToken) }
    );
  }

  undoSplitOrder(options: any) {
    let authToken = localStorage.getItem("userToken");
    let queryparam = '?channelOrderId=' + options;
    return this.http.post<any[]>(
      environment.mergeOrder + queryparam, '',
      { headers: new HttpHeaders().set("Authorization", authToken) }
    );
  }

  createPickList(options: any, type: any) {
    let authToken = localStorage.getItem("userToken");
    return this.http.post<any[]>(
      environment.exportPickingListReport, {
      "orderIds": options,
      "output": "csv",
      "groupsku": "buyer",
      "type": "picking",
      "formatType": type + ''
    },
      { headers: new HttpHeaders().set("Authorization", authToken) }
    );
  }
  exportOrders(options: any) {
    let authToken = localStorage.getItem("userToken");
    return this.http.post<any[]>(
      environment.exportOrderReport, {
      "type": "orderreport",
      "subtype": '',//Atleast pass empty. Infuture this parameter can be removed as it is not used anywhere in the api.
      "start": '',
      "end": '',
      "search": ''
    },
      { headers: new HttpHeaders().set("Authorization", authToken) }
    );
  }

  exportOrdertoCsv(orderIds: any = []) {
    let authToken = localStorage.getItem("userToken");
    let params = new HttpParams();
    params = params.append('ordersIds', orderIds.join(','));
    // orderIds.forEach((id, index) => {
    //   if (index == 0)
    //     qparam = qparam + 'ordersIds=' + id;
    //   else
    //     qparam = qparam + '&ordersIds=' + id;
    // })
    return this.http.get(environment.exportOrdertoCsv, {
      headers: new HttpHeaders().set("Authorization", authToken), params: params
    });
  }

  createPackList(options: any, type: any) {
    let authToken = localStorage.getItem("userToken");
    return this.http.post<any[]>(
      environment.exportPackingListReport, {
      "orderIds": options,
      "output": "csv",
      "formatType": type + '',
      "type": "packing"
    },
      { headers: new HttpHeaders().set("Authorization", authToken) }
    );
  }

  getShippingCourier() {
    let authToken = localStorage.getItem("userToken");
    return this.http.get(environment.inte_shippingCourier, {
      headers: new HttpHeaders().set("Authorization", authToken),
    });
  }

  getLabelInfo(name: any, options: any) {
    ////console.log(name);
    let authToken = localStorage.getItem("userToken");
    return this.http.post<any[]>(
      environment.labelDetails + "?courier=" + name, { "ids": options },
      { headers: new HttpHeaders().set("Authorization", authToken) }
    );
  }

  findOrdersForShipping(options: any) {
    let authToken = localStorage.getItem("userToken");
    return this.http.post<any[]>(
      environment.findOrdersForShipping, { "ids": options },
      { headers: new HttpHeaders().set("Authorization", authToken) }
    );
  }
  connfirmShipment(data: any) {
    let authToken = localStorage.getItem("userToken");
    return this.http.post<any[]>(
      environment.confirm_shipment, data,
      { headers: new HttpHeaders().set("Authorization", authToken) }
    );
  }

  getNotes(id: any) {
    let authToken = localStorage.getItem("userToken");
    return this.http.get<any[]>(
      environment.order_notes_list + '?id=' + id,
      { headers: new HttpHeaders().set("Authorization", authToken) }
    );
  }
  createNotes(id: any, comment: any) {
    let authToken = localStorage.getItem("userToken");
    return this.http.get<any[]>(
      environment.order_notes_create + '?id=' + id + '&comment=' + comment,
      { headers: new HttpHeaders().set("Authorization", authToken) }
    );
  }

  printInvoice(ids: any, type: any) {
    let authToken = localStorage.getItem("userToken");
    return this.http.post<any[]>(
      environment.printInvoice + '?type=' + type, {
      "ids": ids
    },
      { headers: new HttpHeaders().set("Authorization", authToken) }
    );
  }

  async printInvoicePromise(ids: any, type: any) {
    let authToken = localStorage.getItem("userToken");
    // return this.http.post<any[]>(
    //   environment.printInvoice + '?type=' + type, {
    //   "ids": ids
    // },
    //   { headers: new HttpHeaders().set("Authorization", authToken) }
    // );

     return await this.http.post<any[]>(
      environment.printInvoice + '?type=' + type, {
      "ids": ids
    },
      { headers: new HttpHeaders().set("Authorization", authToken) }
    ).toPromise().then((data: any) => {
      return data;
    }).catch((error) => {
      return null;
    });
  }

  updatePrintInvoiceUpdatedSTatus(id: any) {
    let authToken = localStorage.getItem("userToken");
    return this.http.get<any[]>(
      environment.invoice_printed + '?invoiceorderids=' + id,
      { headers: new HttpHeaders().set("Authorization", authToken) }
    );
  }
  updateLableUpdatedSTatus(id: any) {
    let authToken = localStorage.getItem("userToken");
    return this.http.get<any[]>(
      environment.label_printed + '?labelorderids=' + id,
      { headers: new HttpHeaders().set("Authorization", authToken) }
    );
  }

  getIntegrateDetails(id: any) {
    let authToken = localStorage.getItem("userToken");
    return this.http.get(environment.label_setup + '?courierId=' + id, {
      headers: new HttpHeaders().set("Authorization", authToken),
    });
  }

  getCarrierId(shippingCarrier: any) {
    switch (shippingCarrier) {
      case 'Amazon Shipping': return 1;
      case 'Amazon Buy Shipping': return 2;
      case 'dpd': return 3;
      case 'Royal Mail': return 4;
      case 'shipstation': return 5;
      case 'Hermes Logistik Gruppe': return 6;
      case 'DX': return 7;
      case 'RM Click & Drop': return 8;
      case 'WEBSHIPPER': return 9;
      case 'UK Mail': return 10;
      case 'UPS': return 11;
      case 'Yodel': return 12;
      case 'sendapallet': return 13;
      case 'DHL': return 14;
      case 'Interlink Express': return 15;
      case 'USPS': return 16;
      case 'FedEx': return 17;
      case 'Spring Global': return 18;
      case 'Parcelforce': return 19;
      case 'Aramex': return 20;
      case 'India Post': return 21;
      case 'wnDirect': return 22;
      case 'Parcel Moneky': return 25;
      case 'goshippo': return 26;
      case 'Canada Post': return 27;
      case 'TNT': return 28;
      case 'BlueDart': return 29;
      case 'EasyParcel': return 30;
      case 'AmazonEasyShip': return 31;
      case 'EKart': return 32;
      case 'myparceldelivery': return 33;
      default:
        return 0;
    }
  }

  savePrintLabelsData(body, courier: any) {
    let authToken = localStorage.getItem("userToken");

    return this.http.post<any[]>(
      environment.generate_printLabel + '?courier=' + courier, body,
      { headers: new HttpHeaders().set("Authorization", authToken) }
    );
  }

  async savePrintLabelsData1(body, courier: any) {
    let authToken = localStorage.getItem("userToken");

    return await this.http.post<any[]>(
      environment.generate_printLabel + '?courier=' + courier, body,
      { headers: new HttpHeaders().set("Authorization", authToken) }
    ).toPromise().then((data: any) => {
      return data;
    }).catch((error) => {
      return null;
    });
    return this.http.post<any[]>(
      environment.generate_printLabel + '?courier=' + courier, body,
      { headers: new HttpHeaders().set("Authorization", authToken) }
    );
  }
getPrintedLabelsData(id:any){
  let authToken = localStorage.getItem("userToken");
    return this.http.get(environment.get_printLabel + '?labelorderids=' + id, {
      headers: new HttpHeaders().set("Authorization", authToken),
    });
}

async getPrintedLabelsData1(id:any){

  let authToken = localStorage.getItem("userToken");

    return await this.http.get<any[]>(
      environment.get_printLabel + '?labelorderids=' + id, {
        headers: new HttpHeaders().set("Authorization", authToken),}
    ).toPromise().then((data: any) => {
      return data;
    }).catch((error) => {
      return null;
    });

    // return this.http.get(environment.get_printLabel + '?labelorderids=' + id, {
    //   headers: new HttpHeaders().set("Authorization", authToken),
    // });
}
  getChannelRegistration() {
    let authToken = localStorage.getItem("userToken");
    return this.http.get(environment.inte_channelRegistration, {
      headers: new HttpHeaders().set("Authorization", authToken),
    });
  }

  cancelLabel(shipmentid: any) {
    // let shipmentIds=[];
    // shipmentid.forEach(id=>{
    //   formbody.append('shipmentid',id);
    // });

    let authToken = localStorage.getItem("userToken");
    return this.http.post<any[]>(
      environment.cancel_label, { "shipmentIds": shipmentid },
      { headers: new HttpHeaders().set("Authorization", authToken) }
    );
  }
  afterCancelLabel(id: any) {
    let authToken = localStorage.getItem("userToken");
    return this.http.get(environment.after_cancel_label + '?labelorderids=' + id, {
      headers: new HttpHeaders().set("Authorization", authToken),
    });
  }
  getEligibleServicesForAmazonBuyShipping(body) {
    let authToken = localStorage.getItem("userToken");
    return this.http.post<any[]>(
      environment.amzbuyshippingmethods + '?courier=amazon' , body,
      { headers: new HttpHeaders().set("Authorization", authToken) }
    );
  }
  updateShipStatus(body) {
    let authToken = localStorage.getItem("userToken");
    return this.http.post<any[]>(
      environment.update_shipstatus, body,
      { headers: new HttpHeaders().set("Authorization", authToken) }
    );
  }
  getAllOrders() {
    let authToken = localStorage.getItem("userToken");
    return this.http.get<any[]>(
      environment.find_all_orders,
      { headers: new HttpHeaders().set("Authorization", authToken) }
    );
  }
}
