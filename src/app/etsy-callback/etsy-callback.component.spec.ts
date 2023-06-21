import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EtsyCallbackComponent } from './etsy-callback.component';

describe('EtsyCallbackComponent', () => {
  let component: EtsyCallbackComponent;
  let fixture: ComponentFixture<EtsyCallbackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EtsyCallbackComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EtsyCallbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
