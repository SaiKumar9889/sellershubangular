import { TestBed } from '@angular/core/testing';

import { ChannelProductsService } from './channel-products.service';

describe('ChannelProductsService', () => {
  let service: ChannelProductsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChannelProductsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
