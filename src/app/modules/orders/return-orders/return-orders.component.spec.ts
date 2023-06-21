import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReturnOrdersComponent } from './return-orders.component';

describe('ReturnOrdersComponent', () => {
  let component: ReturnOrdersComponent;
  let fixture: ComponentFixture<ReturnOrdersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReturnOrdersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReturnOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
