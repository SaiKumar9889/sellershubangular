import { TestBed } from '@angular/core/testing';

import { CreateOrdersService } from './create-orders.service';

describe('CreateOrdersService', () => {
  let service: CreateOrdersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreateOrdersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
