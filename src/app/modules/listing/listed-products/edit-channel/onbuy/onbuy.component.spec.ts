import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnbuyComponent } from './onbuy.component';

describe('OnbuyComponent', () => {
  let component: OnbuyComponent;
  let fixture: ComponentFixture<OnbuyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OnbuyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OnbuyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
