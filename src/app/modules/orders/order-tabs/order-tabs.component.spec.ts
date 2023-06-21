import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderTabsComponent } from './order-tabs.component';

describe('OrderTabsComponent', () => {
  let component: OrderTabsComponent;
  let fixture: ComponentFixture<OrderTabsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderTabsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
