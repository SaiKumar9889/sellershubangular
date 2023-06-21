import { TestBed } from '@angular/core/testing';

import { YodalInteService } from './yodal-inte.service';

describe('YodalInteService', () => {
  let service: YodalInteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(YodalInteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
