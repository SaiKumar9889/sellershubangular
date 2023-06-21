import { TestBed } from '@angular/core/testing';

import { SpliRulesService } from './spli-rules.service';

describe('SpliRulesService', () => {
  let service: SpliRulesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpliRulesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
