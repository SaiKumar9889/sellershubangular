import { TestBed } from '@angular/core/testing';

import { AppTrackingService } from './app-tracking.service';

describe('AppTrackingService', () => {
  let service: AppTrackingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppTrackingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
