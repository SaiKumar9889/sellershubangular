import { TestBed } from '@angular/core/testing';

import { VolusionInteService } from './volusion-inte.service';

describe('VolusionInteService', () => {
  let service: VolusionInteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VolusionInteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
