import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPoComponent } from './edit-po.component';

describe('EditPoComponent', () => {
  let component: EditPoComponent;
  let fixture: ComponentFixture<EditPoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditPoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
