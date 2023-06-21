import { TestBed } from '@angular/core/testing';

import { InventorySyncService } from './inventory-sync.service';

describe('InventorySyncService', () => {
  let service: InventorySyncService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InventorySyncService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
