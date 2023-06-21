import { TestBed } from '@angular/core/testing';

import { OpencartInteService } from './opencart-inte.service';

describe('OpencartInteService', () => {
  let service: OpencartInteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OpencartInteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
