import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EtsyListingTemplateComponent } from './etsy-listing-template.component';

describe('EtsyListingTemplateComponent', () => {
  let component: EtsyListingTemplateComponent;
  let fixture: ComponentFixture<EtsyListingTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EtsyListingTemplateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EtsyListingTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
