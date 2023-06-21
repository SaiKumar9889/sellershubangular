import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopifyIntiComponent } from './shopify-inti.component';

describe('ShopifyIntiComponent', () => {
  let component: ShopifyIntiComponent;
  let fixture: ComponentFixture<ShopifyIntiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShopifyIntiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopifyIntiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
