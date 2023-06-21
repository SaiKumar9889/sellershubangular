import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopwiredListingTemplateComponent } from './shopwired-listing-template.component';

describe('ShopwiredListingTemplateComponent', () => {
  let component: ShopwiredListingTemplateComponent;
  let fixture: ComponentFixture<ShopwiredListingTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShopwiredListingTemplateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopwiredListingTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
