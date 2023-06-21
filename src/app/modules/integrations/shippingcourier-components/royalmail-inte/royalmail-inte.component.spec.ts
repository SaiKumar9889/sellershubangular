import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoyalmailInteComponent } from './royalmail-inte.component';

describe('RoyalmailInteComponent', () => {
  let component: RoyalmailInteComponent;
  let fixture: ComponentFixture<RoyalmailInteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoyalmailInteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoyalmailInteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
