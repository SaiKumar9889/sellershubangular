import { TestBed } from '@angular/core/testing';

import { XeroInteService } from './xero-inte.service';

describe('XeroInteService', () => {
  let service: XeroInteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(XeroInteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
