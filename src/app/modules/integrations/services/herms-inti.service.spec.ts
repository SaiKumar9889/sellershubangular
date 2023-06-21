import { TestBed } from '@angular/core/testing';

import { HermsIntiService } from './herms-inti.service';

describe('HermsIntiService', () => {
  let service: HermsIntiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HermsIntiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
