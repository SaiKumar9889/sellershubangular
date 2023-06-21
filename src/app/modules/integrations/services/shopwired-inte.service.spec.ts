import { TestBed } from '@angular/core/testing';

import { ShopwiredInteService } from './shopwired-inte.service';

describe('ShopwiredInteService', () => {
  let service: ShopwiredInteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShopwiredInteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
