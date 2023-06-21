import { TestBed } from '@angular/core/testing';

import { ListedProductsService } from './listed-products.service';

describe('ListedProductsService', () => {
  let service: ListedProductsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListedProductsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
