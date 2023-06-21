import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShippingManifestsComponent } from './shipping-manifests.component';

describe('ShippingManifestsComponent', () => {
  let component: ShippingManifestsComponent;
  let fixture: ComponentFixture<ShippingManifestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShippingManifestsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShippingManifestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
