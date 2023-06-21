import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageFbaComponent } from './manage-fba.component';

describe('ManageFbaComponent', () => {
  let component: ManageFbaComponent;
  let fixture: ComponentFixture<ManageFbaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageFbaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageFbaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
