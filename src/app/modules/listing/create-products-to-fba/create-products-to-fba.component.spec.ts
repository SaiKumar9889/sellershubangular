import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateProductsToFbaComponent } from './create-products-to-fba.component';

describe('CreateProductsToFbaComponent', () => {
  let component: CreateProductsToFbaComponent;
  let fixture: ComponentFixture<CreateProductsToFbaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateProductsToFbaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateProductsToFbaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
