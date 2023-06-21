import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FedexComponent } from './fedex.component';

describe('FedexComponent', () => {
  let component: FedexComponent;
  let fixture: ComponentFixture<FedexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FedexComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FedexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
