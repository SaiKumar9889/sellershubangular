import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WoocommerceInteComponent } from './woocommerce-inte.component';

describe('WoocommerceInteComponent', () => {
  let component: WoocommerceInteComponent;
  let fixture: ComponentFixture<WoocommerceInteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WoocommerceInteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WoocommerceInteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
