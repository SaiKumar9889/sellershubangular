import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopifyListingTemplateComponent } from './shopify-listing-template.component';

describe('ShopifyListingTemplateComponent', () => {
  let component: ShopifyListingTemplateComponent;
  let fixture: ComponentFixture<ShopifyListingTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShopifyListingTemplateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopifyListingTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
