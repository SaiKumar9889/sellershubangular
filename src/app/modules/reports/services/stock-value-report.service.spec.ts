import { TestBed } from '@angular/core/testing';

import { StockValueReportService } from './stock-value-report.service';

describe('StockValueReportService', () => {
  let service: StockValueReportService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StockValueReportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
