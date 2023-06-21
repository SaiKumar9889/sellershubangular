import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShippingrilesComponent } from './shippingriles.component';

describe('ShippingrilesComponent', () => {
  let component: ShippingrilesComponent;
  let fixture: ComponentFixture<ShippingrilesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShippingrilesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShippingrilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
