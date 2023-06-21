import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DXInteComponent } from './dx-inte.component';

describe('DXInteComponent', () => {
  let component: DXInteComponent;
  let fixture: ComponentFixture<DXInteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DXInteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DXInteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
