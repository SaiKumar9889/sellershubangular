import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WoocommerceListingTemplateComponent } from './woocommerce-listing-template.component';

describe('WoocommerceListingTemplateComponent', () => {
  let component: WoocommerceListingTemplateComponent;
  let fixture: ComponentFixture<WoocommerceListingTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WoocommerceListingTemplateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WoocommerceListingTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
