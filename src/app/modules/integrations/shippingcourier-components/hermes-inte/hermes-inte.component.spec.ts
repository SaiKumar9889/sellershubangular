import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HermesInteComponent } from './hermes-inte.component';

describe('HermesInteComponent', () => {
  let component: HermesInteComponent;
  let fixture: ComponentFixture<HermesInteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HermesInteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HermesInteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
