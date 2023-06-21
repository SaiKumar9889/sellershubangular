import { TestBed } from '@angular/core/testing';

import { SendProductsInFbaService } from './send-products-in-fba.service';

describe('SendProductsInFbaService', () => {
  let service: SendProductsInFbaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SendProductsInFbaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
