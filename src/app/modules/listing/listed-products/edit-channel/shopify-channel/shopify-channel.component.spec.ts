import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopifyChannelComponent } from './shopify-channel.component';

describe('ShopifyChannelComponent', () => {
  let component: ShopifyChannelComponent;
  let fixture: ComponentFixture<ShopifyChannelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShopifyChannelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopifyChannelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
