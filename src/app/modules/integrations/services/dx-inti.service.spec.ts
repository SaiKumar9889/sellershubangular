import { TestBed } from '@angular/core/testing';

import { DxIntiService } from './dx-inti.service';

describe('DxIntiService', () => {
  let service: DxIntiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DxIntiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
