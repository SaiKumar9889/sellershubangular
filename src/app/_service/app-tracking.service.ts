import { Injectable } from '@angular/core';
import { usertrackInput } from '../_models/usertrackInput';

@Injectable({
  providedIn: 'root'
})
export class AppTrackingService {

  constructor() { }

  trackUserActivity(ip:usertrackInput){
console.log(ip)
  }
}
