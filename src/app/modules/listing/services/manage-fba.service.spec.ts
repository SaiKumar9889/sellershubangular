import { TestBed } from '@angular/core/testing';

import { ManageFbaService } from './manage-fba.service';

describe('ManageFbaService', () => {
  let service: ManageFbaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ManageFbaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
