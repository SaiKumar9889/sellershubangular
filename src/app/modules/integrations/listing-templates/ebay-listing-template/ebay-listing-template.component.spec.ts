import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EbayListingTemplateComponent } from './ebay-listing-template.component';

describe('EbayListingTemplateComponent', () => {
  let component: EbayListingTemplateComponent;
  let fixture: ComponentFixture<EbayListingTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EbayListingTemplateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EbayListingTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
