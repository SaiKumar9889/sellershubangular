import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadyToShipmentComponent } from './ready-to-shipment.component';

describe('ReadyToShipmentComponent', () => {
  let component: ReadyToShipmentComponent;
  let fixture: ComponentFixture<ReadyToShipmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReadyToShipmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadyToShipmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
