import { TestBed } from '@angular/core/testing';

import { WaitingToListService } from './waiting-to-list.service';

describe('WaitingToListService', () => {
  let service: WaitingToListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WaitingToListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
