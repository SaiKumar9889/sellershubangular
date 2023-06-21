import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnouncmentsComponent } from './announcments.component';

describe('AnnouncmentsComponent', () => {
  let component: AnnouncmentsComponent;
  let fixture: ComponentFixture<AnnouncmentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnnouncmentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnnouncmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
