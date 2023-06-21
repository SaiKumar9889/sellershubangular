import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BarcodeUsedComponent } from './barcode-used.component';

describe('BarcodeUsedComponent', () => {
  let component: BarcodeUsedComponent;
  let fixture: ComponentFixture<BarcodeUsedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BarcodeUsedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BarcodeUsedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
