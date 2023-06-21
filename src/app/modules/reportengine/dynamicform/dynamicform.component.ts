import { AfterViewInit, Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-dynamicform',
  templateUrl: './dynamicform.component.html',
  styleUrls: ['./dynamicform.component.css']
})
export class DynamicformComponent implements OnInit, AfterViewInit {
  @Input() UIelements: any[];
  constructor() { }
  ngAfterViewInit(): void {
    //////console.log(this.UIelements);
  }

  ngOnInit(): void {
    //////console.log(this.UIelements);
  }
  emitEvent(event: any) {
    //////console.log(event);
  }
}
