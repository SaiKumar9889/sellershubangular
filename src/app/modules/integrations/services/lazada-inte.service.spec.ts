import { TestBed } from '@angular/core/testing';

import { LazadaInteService } from './lazada-inte.service';

describe('LazadaInteService', () => {
  let service: LazadaInteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LazadaInteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
