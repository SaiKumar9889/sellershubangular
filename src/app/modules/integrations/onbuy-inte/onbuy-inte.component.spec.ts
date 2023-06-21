import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OnbuyInteComponent } from './onbuy-inte.component';

describe('OnbuyInteComponent', () => {
  let component: OnbuyInteComponent;
  let fixture: ComponentFixture<OnbuyInteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OnbuyInteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OnbuyInteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
