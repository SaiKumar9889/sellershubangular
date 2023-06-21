import { TestBed } from '@angular/core/testing';

import { StocksummaryService } from './stocksummary.service';

describe('StocksummaryService', () => {
  let service: StocksummaryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StocksummaryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
