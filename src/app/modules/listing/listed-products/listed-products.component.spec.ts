import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListedProductsComponent } from './listed-products.component';

describe('ListedProductsComponent', () => {
  let component: ListedProductsComponent;
  let fixture: ComponentFixture<ListedProductsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListedProductsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListedProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
