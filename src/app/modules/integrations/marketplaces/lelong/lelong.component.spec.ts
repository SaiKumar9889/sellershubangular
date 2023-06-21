import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LelongComponent } from './lelong.component';

describe('LelongComponent', () => {
  let component: LelongComponent;
  let fixture: ComponentFixture<LelongComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LelongComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LelongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
