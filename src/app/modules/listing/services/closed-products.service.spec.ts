import { TestBed } from '@angular/core/testing';

import { ClosedProductsService } from './closed-products.service';

describe('ClosedProductsService', () => {
  let service: ClosedProductsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClosedProductsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
