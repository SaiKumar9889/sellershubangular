import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BarcodeConvertToSkuComponent } from './barcode-convert-to-sku.component';

describe('BarcodeConvertToSkuComponent', () => {
  let component: BarcodeConvertToSkuComponent;
  let fixture: ComponentFixture<BarcodeConvertToSkuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BarcodeConvertToSkuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BarcodeConvertToSkuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
