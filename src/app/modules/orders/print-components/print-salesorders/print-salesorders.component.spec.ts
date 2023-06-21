import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintSalesordersComponent } from './print-salesorders.component';

describe('PrintSalesordersComponent', () => {
  let component: PrintSalesordersComponent;
  let fixture: ComponentFixture<PrintSalesordersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrintSalesordersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrintSalesordersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
