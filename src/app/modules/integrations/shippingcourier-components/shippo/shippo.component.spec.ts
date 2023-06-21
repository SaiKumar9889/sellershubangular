import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShippoComponent } from './shippo.component';

describe('ShippoComponent', () => {
  let component: ShippoComponent;
  let fixture: ComponentFixture<ShippoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShippoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShippoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
