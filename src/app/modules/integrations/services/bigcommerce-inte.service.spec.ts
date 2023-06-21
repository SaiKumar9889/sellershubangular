import { TestBed } from '@angular/core/testing';

import { BigcommerceInteService } from './bigcommerce-inte.service';

describe('BigcommerceInteService', () => {
  let service: BigcommerceInteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BigcommerceInteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
