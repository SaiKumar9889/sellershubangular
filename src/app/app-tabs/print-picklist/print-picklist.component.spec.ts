import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintPicklistComponent } from './print-picklist.component';

describe('PrintPicklistComponent', () => {
  let component: PrintPicklistComponent;
  let fixture: ComponentFixture<PrintPicklistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrintPicklistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrintPicklistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
