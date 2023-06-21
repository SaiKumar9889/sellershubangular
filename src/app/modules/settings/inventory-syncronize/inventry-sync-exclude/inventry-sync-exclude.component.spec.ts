import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InventrySyncExcludeComponent } from './inventry-sync-exclude.component';

describe('InventrySyncExcludeComponent', () => {
  let component: InventrySyncExcludeComponent;
  let fixture: ComponentFixture<InventrySyncExcludeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InventrySyncExcludeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InventrySyncExcludeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
