import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DpdInteComponent } from './dpd-inte.component';

describe('DpdInteComponent', () => {
  let component: DpdInteComponent;
  let fixture: ComponentFixture<DpdInteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DpdInteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DpdInteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
