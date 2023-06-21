import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicUiuilderComponent } from './dynamic-uiuilder.component';

describe('DynamicUiuilderComponent', () => {
  let component: DynamicUiuilderComponent;
  let fixture: ComponentFixture<DynamicUiuilderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DynamicUiuilderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicUiuilderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
