import { TestBed } from '@angular/core/testing';

import { DownloadcsvService } from './downloadcsv.service';

describe('DownloadcsvService', () => {
  let service: DownloadcsvService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DownloadcsvService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
