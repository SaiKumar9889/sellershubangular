import { TestBed } from '@angular/core/testing';

import { AmazonShippingService } from './amazon-shipping.service';

describe('AmazonShippingService', () => {
  let service: AmazonShippingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AmazonShippingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
