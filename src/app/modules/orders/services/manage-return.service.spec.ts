import { TestBed } from '@angular/core/testing';

import { ManageReturnService } from './manage-return.service';

describe('ManageReturnService', () => {
  let service: ManageReturnService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ManageReturnService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
