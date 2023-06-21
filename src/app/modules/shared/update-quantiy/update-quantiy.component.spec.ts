import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateQuantiyComponent } from './update-quantiy.component';

describe('UpdateQuantiyComponent', () => {
  let component: UpdateQuantiyComponent;
  let fixture: ComponentFixture<UpdateQuantiyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateQuantiyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateQuantiyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
