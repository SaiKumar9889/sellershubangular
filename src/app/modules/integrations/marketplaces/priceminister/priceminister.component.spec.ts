import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PriceministerComponent } from './priceminister.component';

describe('PriceministerComponent', () => {
  let component: PriceministerComponent;
  let fixture: ComponentFixture<PriceministerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PriceministerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PriceministerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
