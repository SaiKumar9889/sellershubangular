import { TestBed } from '@angular/core/testing';

import { ShopeeInteService } from './shopee-inte.service';

describe('ShopeeInteService', () => {
  let service: ShopeeInteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShopeeInteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
