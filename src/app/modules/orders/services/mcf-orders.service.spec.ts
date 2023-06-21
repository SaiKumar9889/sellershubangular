import { TestBed } from '@angular/core/testing';

import { McfOrdersService } from './mcf-orders.service';

describe('McfOrdersService', () => {
  let service: McfOrdersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(McfOrdersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
