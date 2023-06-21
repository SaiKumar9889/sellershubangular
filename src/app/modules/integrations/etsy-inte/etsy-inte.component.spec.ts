import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EtsyInteComponent } from './etsy-inte.component';

describe('EtsyInteComponent', () => {
  let component: EtsyInteComponent;
  let fixture: ComponentFixture<EtsyInteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EtsyInteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EtsyInteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
