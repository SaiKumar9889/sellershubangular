import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VirtualPrinterComponent } from './virtual-printer.component';

describe('VirtualPrinterComponent', () => {
  let component: VirtualPrinterComponent;
  let fixture: ComponentFixture<VirtualPrinterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VirtualPrinterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VirtualPrinterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
