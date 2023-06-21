import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PretashopInteComponent } from './pretashop-inte.component';

describe('PretashopInteComponent', () => {
  let component: PretashopInteComponent;
  let fixture: ComponentFixture<PretashopInteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PretashopInteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PretashopInteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
