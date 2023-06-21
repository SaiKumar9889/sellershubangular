import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryTabsComponent } from './inventory-tabs.component';

describe('InventoryTabsComponent', () => {
  let component: InventoryTabsComponent;
  let fixture: ComponentFixture<InventoryTabsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InventoryTabsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InventoryTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
