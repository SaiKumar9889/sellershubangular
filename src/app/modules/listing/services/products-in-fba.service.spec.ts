import { TestBed } from '@angular/core/testing';

import { ProductsInFbaService } from './products-in-fba.service';

describe('ProductsInFbaService', () => {
  let service: ProductsInFbaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductsInFbaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
