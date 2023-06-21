import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorLabelsComponent } from './error-labels.component';

describe('ErrorLabelsComponent', () => {
  let component: ErrorLabelsComponent;
  let fixture: ComponentFixture<ErrorLabelsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ErrorLabelsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ErrorLabelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
