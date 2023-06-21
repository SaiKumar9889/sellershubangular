import { TestBed } from '@angular/core/testing';

import { WoocommerseService } from './woocommerse.service';

describe('WoocommerseService', () => {
  let service: WoocommerseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WoocommerseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
