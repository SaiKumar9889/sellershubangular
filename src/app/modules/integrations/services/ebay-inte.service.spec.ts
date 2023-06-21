import { TestBed } from '@angular/core/testing';

import { EbayInteService } from './ebay-inte.service';

describe('EbayInteService', () => {
  let service: EbayInteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EbayInteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
