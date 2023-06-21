import { Component, Input, OnInit } from '@angular/core';
import { SpliRulesService } from '../services/spli-rules.service';

@Component({
  selector: 'app-split-rules',
  templateUrl: './split-rules.component.html',
  styleUrls: ['./split-rules.component.scss']
})
export class SplitRulesComponent implements OnInit {

    //channelId
    @Input()
    channelId: number;

    @Input()
    channel: any;

    splitRule = {
      ruleType:'SINGLE_ITEM',
      minValue: 0,
      maxValue: 0
    }
    loader: boolean = false;

  constructor(private splitserv:SpliRulesService) { }

  ngOnInit(): void {
    this.getSpliRulz();
  }
  getSpliRulz() {
    this.loader = true;
    this.splitserv.getChannel(this.channelId ).subscribe((resp: any) => {
      this.channel = resp;
      this.loader = false;
    })
  }
  updateSpliRulz() {
    this.loader = true;
    let obj;
    if (this.splitRule.ruleType == 'NONE'){
      obj = {
        id: this.channelId,
        orderSplitRules: ''
      }
    }else {
      obj = {
        id: this.channelId,
        orderSplitRules: JSON.stringify(this.splitRule)
      }
    }

    this.splitserv.updateSpliRulz(obj).subscribe((resp: any) => {
      this.channel = resp;
      this.loader = false;
    })
  }

}
