import { TestBed } from '@angular/core/testing';

import { ShopifyInteService } from './shopify-inte.service';

describe('ShopifyInteService', () => {
  let service: ShopifyInteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShopifyInteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
