import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YodelInteComponent } from './yodel-inte.component';

describe('YodelInteComponent', () => {
  let component: YodelInteComponent;
  let fixture: ComponentFixture<YodelInteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YodelInteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YodelInteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
