import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintPacklistComponent } from './print-packlist.component';

describe('PrintPacklistComponent', () => {
  let component: PrintPacklistComponent;
  let fixture: ComponentFixture<PrintPacklistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrintPacklistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrintPacklistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
