import { TestBed } from '@angular/core/testing';

import { CreateProductsToFbaService } from './create-products-to-fba.service';

describe('CreateProductsToFbaService', () => {
  let service: CreateProductsToFbaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreateProductsToFbaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
