import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShipstationComponent } from './shipstation.component';

describe('ShipstationComponent', () => {
  let component: ShipstationComponent;
  let fixture: ComponentFixture<ShipstationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShipstationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShipstationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
