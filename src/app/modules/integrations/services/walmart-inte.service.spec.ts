import { TestBed } from '@angular/core/testing';

import { WalmartInteService } from './walmart-inte.service';

describe('WalmartInteService', () => {
  let service: WalmartInteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WalmartInteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
