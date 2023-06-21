import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { McfOrdersComponent } from './mcf-orders.component';

describe('McfOrdersComponent', () => {
  let component: McfOrdersComponent;
  let fixture: ComponentFixture<McfOrdersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ McfOrdersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(McfOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
