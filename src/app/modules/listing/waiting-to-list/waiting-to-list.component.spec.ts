import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WaitingToListComponent } from './waiting-to-list.component';

describe('WaitingToListComponent', () => {
  let component: WaitingToListComponent;
  let fixture: ComponentFixture<WaitingToListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WaitingToListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WaitingToListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
