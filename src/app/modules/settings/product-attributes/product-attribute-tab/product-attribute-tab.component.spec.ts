import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductAttributeTabComponent } from './product-attribute-tab.component';

describe('ProductAttributeTabComponent', () => {
  let component: ProductAttributeTabComponent;
  let fixture: ComponentFixture<ProductAttributeTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductAttributeTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductAttributeTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
