import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParcelforceComponent } from './parcelforce.component';

describe('ParcelforceComponent', () => {
  let component: ParcelforceComponent;
  let fixture: ComponentFixture<ParcelforceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParcelforceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ParcelforceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
