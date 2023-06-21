import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Magento2ListingTemplateComponent } from './magento2-listing-template.component';

describe('Magento2ListingTemplateComponent', () => {
  let component: Magento2ListingTemplateComponent;
  let fixture: ComponentFixture<Magento2ListingTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Magento2ListingTemplateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Magento2ListingTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
