import { ComponentFixture, TestBed } from '@angular/core/testing';

import { XcartComponent } from './xcart.component';

describe('XcartComponent', () => {
  let component: XcartComponent;
  let fixture: ComponentFixture<XcartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ XcartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(XcartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
