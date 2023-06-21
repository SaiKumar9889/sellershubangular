import { TestBed } from '@angular/core/testing';

import { BulkActionsService } from './bulk-actions.service';

describe('BulkActionsService', () => {
  let service: BulkActionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BulkActionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
