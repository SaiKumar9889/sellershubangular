import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChannelScheduledListingComponent } from './channel-scheduled-listing.component';

describe('ChannelScheduledListingComponent', () => {
  let component: ChannelScheduledListingComponent;
  let fixture: ComponentFixture<ChannelScheduledListingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChannelScheduledListingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChannelScheduledListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
