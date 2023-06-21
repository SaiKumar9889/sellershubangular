import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AmazonShippingComponent } from './amazon-shipping.component';

describe('AmazonShippingComponent', () => {
  let component: AmazonShippingComponent;
  let fixture: ComponentFixture<AmazonShippingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AmazonShippingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AmazonShippingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
