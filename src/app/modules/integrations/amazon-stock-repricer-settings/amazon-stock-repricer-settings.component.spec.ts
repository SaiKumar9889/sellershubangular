import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AmazonStockRepricerSettingsComponent } from './amazon-stock-repricer-settings.component';

describe('AmazonStockRepricerSettingsComponent', () => {
  let component: AmazonStockRepricerSettingsComponent;
  let fixture: ComponentFixture<AmazonStockRepricerSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AmazonStockRepricerSettingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AmazonStockRepricerSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
