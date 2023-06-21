import { TestBed } from '@angular/core/testing';

import { EtsyService } from './etsy.service';

describe('EtsyService', () => {
  let service: EtsyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EtsyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
