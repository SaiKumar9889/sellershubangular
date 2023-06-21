import { TestBed } from '@angular/core/testing';

import { SearchByProductService } from './search-by-product.service';

describe('SearchByProductService', () => {
  let service: SearchByProductService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SearchByProductService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
