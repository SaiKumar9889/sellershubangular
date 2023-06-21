import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClosedProductsComponent } from './closed-products.component';

describe('ClosedProductsComponent', () => {
  let component: ClosedProductsComponent;
  let fixture: ComponentFixture<ClosedProductsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClosedProductsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClosedProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
