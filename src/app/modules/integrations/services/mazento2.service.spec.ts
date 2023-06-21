import { TestBed } from '@angular/core/testing';

import { Mazento2Service } from './mazento2.service';

describe('Mazento2Service', () => {
  let service: Mazento2Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Mazento2Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
