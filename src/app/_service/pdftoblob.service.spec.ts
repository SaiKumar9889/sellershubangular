import { TestBed } from '@angular/core/testing';

import { PdftoblobService } from './pdftoblob.service';

describe('PdftoblobService', () => {
  let service: PdftoblobService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PdftoblobService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
