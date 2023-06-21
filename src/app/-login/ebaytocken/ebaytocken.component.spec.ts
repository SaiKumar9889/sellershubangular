import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EbaytockenComponent } from './ebaytocken.component';

describe('EbaytockenComponent', () => {
  let component: EbaytockenComponent;
  let fixture: ComponentFixture<EbaytockenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EbaytockenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EbaytockenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
