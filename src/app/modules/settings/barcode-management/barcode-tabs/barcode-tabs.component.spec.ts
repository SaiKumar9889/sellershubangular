import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BarcodeTabsComponent } from './barcode-tabs.component';

describe('BarcodeTabsComponent', () => {
  let component: BarcodeTabsComponent;
  let fixture: ComponentFixture<BarcodeTabsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BarcodeTabsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BarcodeTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
