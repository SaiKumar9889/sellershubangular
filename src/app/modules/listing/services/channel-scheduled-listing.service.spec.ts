import { TestBed } from '@angular/core/testing';

import { ChannelScheduledListingService } from './channel-scheduled-listing.service';

describe('ChannelScheduledListingService', () => {
  let service: ChannelScheduledListingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChannelScheduledListingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
