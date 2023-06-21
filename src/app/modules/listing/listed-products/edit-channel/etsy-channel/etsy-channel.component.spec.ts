import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EtsyChannelComponent } from './etsy-channel.component';

describe('EtsyChannelComponent', () => {
  let component: EtsyChannelComponent;
  let fixture: ComponentFixture<EtsyChannelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EtsyChannelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EtsyChannelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
