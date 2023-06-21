import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InventrySyncTabsComponent } from './inventry-sync-tabs.component';

describe('InventrySyncTabsComponent', () => {
  let component: InventrySyncTabsComponent;
  let fixture: ComponentFixture<InventrySyncTabsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InventrySyncTabsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InventrySyncTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
