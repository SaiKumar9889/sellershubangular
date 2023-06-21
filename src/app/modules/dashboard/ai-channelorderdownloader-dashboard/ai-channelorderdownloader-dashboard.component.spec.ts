import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AiChannelorderdownloaderDashboardComponent } from './ai-channelorderdownloader-dashboard.component';

describe('AiChannelorderdownloaderDashboardComponent', () => {
  let component: AiChannelorderdownloaderDashboardComponent;
  let fixture: ComponentFixture<AiChannelorderdownloaderDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AiChannelorderdownloaderDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AiChannelorderdownloaderDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
