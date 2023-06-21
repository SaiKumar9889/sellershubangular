import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DispatchConsoleComponent } from './dispatch-console.component';

describe('DispatchConsoleComponent', () => {
  let component: DispatchConsoleComponent;
  let fixture: ComponentFixture<DispatchConsoleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DispatchConsoleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DispatchConsoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
