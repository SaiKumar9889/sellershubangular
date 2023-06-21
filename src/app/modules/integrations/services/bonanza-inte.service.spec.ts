import { TestBed } from '@angular/core/testing';

import { BonanzaInteService } from './bonanza-inte.service';

describe('BonanzaInteService', () => {
  let service: BonanzaInteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BonanzaInteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
