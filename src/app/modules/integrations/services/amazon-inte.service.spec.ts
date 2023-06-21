import { TestBed } from '@angular/core/testing';

import { AmazonInteService } from './amazon-inte.service';

describe('AmazonInteService', () => {
  let service: AmazonInteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AmazonInteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
