import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AmazonListingTemplateComponent } from './amazon-listing-template.component';

describe('AmazonListingTemplateComponent', () => {
  let component: AmazonListingTemplateComponent;
  let fixture: ComponentFixture<AmazonListingTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AmazonListingTemplateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AmazonListingTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
