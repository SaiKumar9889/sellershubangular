import { TestBed } from '@angular/core/testing';

import { CancelledOrdersService } from './cancelled-orders.service';

describe('CancelledOrdersService', () => {
  let service: CancelledOrdersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CancelledOrdersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
