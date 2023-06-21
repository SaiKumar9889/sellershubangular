import { TestBed } from '@angular/core/testing';

import { SalsesOrdersService } from './salses-orders.service';

describe('SalsesOrdersService', () => {
  let service: SalsesOrdersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SalsesOrdersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
