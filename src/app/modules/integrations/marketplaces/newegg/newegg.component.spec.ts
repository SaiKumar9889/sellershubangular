import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NeweggComponent } from './newegg.component';

describe('NeweggComponent', () => {
  let component: NeweggComponent;
  let fixture: ComponentFixture<NeweggComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NeweggComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NeweggComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
