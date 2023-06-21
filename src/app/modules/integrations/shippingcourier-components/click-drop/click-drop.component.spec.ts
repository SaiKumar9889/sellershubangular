import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClickDropComponent } from './click-drop.component';

describe('ClickDropComponent', () => {
  let component: ClickDropComponent;
  let fixture: ComponentFixture<ClickDropComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClickDropComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClickDropComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
