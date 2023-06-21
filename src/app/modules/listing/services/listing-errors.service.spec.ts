import { TestBed } from '@angular/core/testing';

import { ListingErrorsService } from './listing-errors.service';

describe('ListingErrorsService', () => {
  let service: ListingErrorsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListingErrorsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
