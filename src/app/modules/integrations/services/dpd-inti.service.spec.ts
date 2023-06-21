import { TestBed } from '@angular/core/testing';

import { DpdIntiService } from './dpd-inti.service';

describe('DpdIntiService', () => {
  let service: DpdIntiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DpdIntiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
