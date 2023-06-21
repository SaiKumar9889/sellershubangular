import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BarcodeManagementComponent } from './barcode-management.component';

describe('BarcodeManagementComponent', () => {
  let component: BarcodeManagementComponent;
  let fixture: ComponentFixture<BarcodeManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BarcodeManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BarcodeManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
