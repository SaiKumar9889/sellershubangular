import { TestBed } from '@angular/core/testing';

import { XcartInteService } from './xcart-inte.service';

describe('XcartInteService', () => {
  let service: XcartInteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(XcartInteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
