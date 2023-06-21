import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlubitComponent } from './flubit.component';

describe('FlubitComponent', () => {
  let component: FlubitComponent;
  let fixture: ComponentFixture<FlubitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FlubitComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FlubitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
