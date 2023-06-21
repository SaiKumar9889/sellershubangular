import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Reportviewv2Component } from './reportviewv2.component';

describe('Reportviewv2Component', () => {
  let component: Reportviewv2Component;
  let fixture: ComponentFixture<Reportviewv2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Reportviewv2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Reportviewv2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
