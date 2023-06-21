import { TestBed } from '@angular/core/testing';

import { ClickDropService } from './click-drop.service';

describe('ClickDropService', () => {
  let service: ClickDropService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClickDropService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
