import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RedemCouponComponent } from './redem-coupon.component';

describe('RedemCouponComponent', () => {
  let component: RedemCouponComponent;
  let fixture: ComponentFixture<RedemCouponComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RedemCouponComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RedemCouponComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
