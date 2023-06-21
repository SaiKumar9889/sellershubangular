import { TestBed } from '@angular/core/testing';

import { OnbuService } from './onbu.service';

describe('OnbuService', () => {
  let service: OnbuService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OnbuService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
