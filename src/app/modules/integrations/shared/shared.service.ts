import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  channelId: any;
  constructor() { }

  setID(data){
    this.channelId = data;
  }

  getID(){
    return this.channelId;
  }
}
