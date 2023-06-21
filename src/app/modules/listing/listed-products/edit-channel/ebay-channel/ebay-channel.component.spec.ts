import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EbayChannelComponent } from './ebay-channel.component';

describe('EbayChannelComponent', () => {
  let component: EbayChannelComponent;
  let fixture: ComponentFixture<EbayChannelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EbayChannelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EbayChannelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
