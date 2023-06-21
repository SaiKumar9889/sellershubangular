import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintPackingslipComponent } from './print-packingslip.component';

describe('PrintPackingslipComponent', () => {
  let component: PrintPackingslipComponent;
  let fixture: ComponentFixture<PrintPackingslipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrintPackingslipComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrintPackingslipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
