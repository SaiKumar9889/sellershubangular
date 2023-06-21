import { TestBed } from '@angular/core/testing';

import { PrestaShopService } from './presta-shop.service';

describe('PrestaShopService', () => {
  let service: PrestaShopService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PrestaShopService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
