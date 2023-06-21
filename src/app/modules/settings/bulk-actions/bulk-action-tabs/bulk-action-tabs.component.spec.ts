import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BulkActionTabsComponent } from './bulk-action-tabs.component';

describe('BulkActionTabsComponent', () => {
  let component: BulkActionTabsComponent;
  let fixture: ComponentFixture<BulkActionTabsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BulkActionTabsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BulkActionTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
