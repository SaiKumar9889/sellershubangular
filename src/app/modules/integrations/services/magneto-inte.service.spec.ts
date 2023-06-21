import { TestBed } from '@angular/core/testing';

import { MagnetoInteService } from './magneto-inte.service';

describe('MagnetoInteService', () => {
  let service: MagnetoInteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MagnetoInteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
