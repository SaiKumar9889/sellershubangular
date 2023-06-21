import { TestBed } from '@angular/core/testing';

import { ChannelIntegrationService } from './channel-integration.service';

describe('ChannelIntegrationService', () => {
  let service: ChannelIntegrationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChannelIntegrationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
