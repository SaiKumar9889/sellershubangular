import { TestBed } from '@angular/core/testing';

import { InvoiceTemplatesService } from './invoice-templates.service';

describe('InvoiceTemplatesService', () => {
  let service: InvoiceTemplatesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InvoiceTemplatesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
