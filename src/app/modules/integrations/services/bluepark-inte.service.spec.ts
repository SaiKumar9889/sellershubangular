import { TestBed } from '@angular/core/testing';

import { BlueparkInteService } from './bluepark-inte.service';

describe('BlueparkInteService', () => {
  let service: BlueparkInteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BlueparkInteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
