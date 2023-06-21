import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AmazonStockRepricerComponent } from './amazon-stock-repricer.component';

describe('AmazonStockRepricerComponent', () => {
  let component: AmazonStockRepricerComponent;
  let fixture: ComponentFixture<AmazonStockRepricerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AmazonStockRepricerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AmazonStockRepricerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
