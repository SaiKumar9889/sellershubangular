import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChannelProductsComponent } from './channel-products.component';

describe('ChannelProductsComponent', () => {
  let component: ChannelProductsComponent;
  let fixture: ComponentFixture<ChannelProductsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChannelProductsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChannelProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
