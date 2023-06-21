import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShippingCourierSetupComponent } from './shipping-courier-setup.component';

describe('ShippingCourierSetupComponent', () => {
  let component: ShippingCourierSetupComponent;
  let fixture: ComponentFixture<ShippingCourierSetupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShippingCourierSetupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShippingCourierSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
