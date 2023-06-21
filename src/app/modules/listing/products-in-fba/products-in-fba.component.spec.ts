import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsInFbaComponent } from './products-in-fba.component';

describe('ProductsInFbaComponent', () => {
  let component: ProductsInFbaComponent;
  let fixture: ComponentFixture<ProductsInFbaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductsInFbaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsInFbaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
