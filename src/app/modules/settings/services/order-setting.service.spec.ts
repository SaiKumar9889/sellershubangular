import { TestBed } from '@angular/core/testing';

import { OrderSettingService } from './order-setting.service';

describe('OrderSettingService', () => {
  let service: OrderSettingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrderSettingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
