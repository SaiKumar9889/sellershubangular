import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportengineComponent } from './reportengine.component';

describe('ReportengineComponent', () => {
  let component: ReportengineComponent;
  let fixture: ComponentFixture<ReportengineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportengineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportengineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
