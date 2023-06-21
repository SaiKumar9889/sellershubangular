import { TestBed } from '@angular/core/testing';

import { PackingslipGenartionService } from './packingslip-genartion.service';

describe('PackingslipGenartionService', () => {
  let service: PackingslipGenartionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PackingslipGenartionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
