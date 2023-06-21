import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintViewBuilderComponent } from './print-view-builder.component';

describe('PrintViewBuilderComponent', () => {
  let component: PrintViewBuilderComponent;
  let fixture: ComponentFixture<PrintViewBuilderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrintViewBuilderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrintViewBuilderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
