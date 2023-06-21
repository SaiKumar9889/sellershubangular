import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InventorySyncronizeComponent } from './inventory-syncronize.component';

describe('InventorySyncronizeComponent', () => {
  let component: InventorySyncronizeComponent;
  let fixture: ComponentFixture<InventorySyncronizeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InventorySyncronizeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InventorySyncronizeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
