import { TestBed } from '@angular/core/testing';

import { StockOverviewService } from './stock-overview.service';

describe('StockOverviewService', () => {
  let service: StockOverviewService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StockOverviewService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
