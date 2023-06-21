import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AmazonLogisticComponent } from './amazon-logistic.component';

describe('AmazonLogisticComponent', () => {
  let component: AmazonLogisticComponent;
  let fixture: ComponentFixture<AmazonLogisticComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AmazonLogisticComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AmazonLogisticComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
