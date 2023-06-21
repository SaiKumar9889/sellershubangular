import { TestBed } from '@angular/core/testing';

import { RoyalIntiService } from './royal-inti.service';

describe('RoyalIntiService', () => {
  let service: RoyalIntiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RoyalIntiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
