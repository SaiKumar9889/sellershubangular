import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SendProductsFbaComponent } from './send-products-fba.component';

describe('SendProductsFbaComponent', () => {
  let component: SendProductsFbaComponent;
  let fixture: ComponentFixture<SendProductsFbaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SendProductsFbaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SendProductsFbaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
