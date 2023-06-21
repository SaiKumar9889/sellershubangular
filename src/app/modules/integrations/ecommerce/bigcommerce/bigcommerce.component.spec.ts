import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BigcommerceComponent } from './bigcommerce.component';

describe('BigcommerceComponent', () => {
  let component: BigcommerceComponent;
  let fixture: ComponentFixture<BigcommerceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BigcommerceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BigcommerceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
