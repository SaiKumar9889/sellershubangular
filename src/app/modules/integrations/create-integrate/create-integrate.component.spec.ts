import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateIntegrateComponent } from './create-integrate.component';

describe('CreateIntegrateComponent', () => {
  let component: CreateIntegrateComponent;
  let fixture: ComponentFixture<CreateIntegrateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateIntegrateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateIntegrateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
