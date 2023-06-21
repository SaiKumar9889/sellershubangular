import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FbaCalculatorComponent } from './fba-calculator.component';

describe('FbaCalculatorComponent', () => {
  let component: FbaCalculatorComponent;
  let fixture: ComponentFixture<FbaCalculatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FbaCalculatorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FbaCalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
