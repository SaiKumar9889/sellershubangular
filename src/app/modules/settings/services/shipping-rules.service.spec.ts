import { TestBed } from '@angular/core/testing';

import { ShippingRulesService } from './shipping-rules.service';

describe('ShippingRulesService', () => {
  let service: ShippingRulesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShippingRulesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
