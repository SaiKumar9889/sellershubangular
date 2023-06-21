import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChannelIntegrationComponent } from './channel-integration.component';

describe('ChannelIntegrationComponent', () => {
  let component: ChannelIntegrationComponent;
  let fixture: ComponentFixture<ChannelIntegrationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChannelIntegrationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChannelIntegrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
