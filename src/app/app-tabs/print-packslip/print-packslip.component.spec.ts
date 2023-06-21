import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintPackslipComponent } from './print-packslip.component';

describe('PrintPackslipComponent', () => {
  let component: PrintPackslipComponent;
  let fixture: ComponentFixture<PrintPackslipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrintPackslipComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrintPackslipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
