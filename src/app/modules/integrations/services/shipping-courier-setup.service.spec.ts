import { TestBed } from '@angular/core/testing';

import { ShippingCourierSetupService } from './shipping-courier-setup.service';

describe('ShippingCourierSetupService', () => {
  let service: ShippingCourierSetupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShippingCourierSetupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
