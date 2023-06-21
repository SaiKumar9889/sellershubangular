import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AmazonChannelComponent } from './amazon-channel.component';

describe('AmazonChannelComponent', () => {
  let component: AmazonChannelComponent;
  let fixture: ComponentFixture<AmazonChannelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AmazonChannelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AmazonChannelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
