import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEcomIntegrateComponent } from './create-ecom-integrate.component';

describe('CreateEcomIntegrateComponent', () => {
  let component: CreateEcomIntegrateComponent;
  let fixture: ComponentFixture<CreateEcomIntegrateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateEcomIntegrateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateEcomIntegrateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
