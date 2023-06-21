import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AmazonInteComponent } from './amazon-inte.component';

describe('AmazonInteComponent', () => {
  let component: AmazonInteComponent;
  let fixture: ComponentFixture<AmazonInteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AmazonInteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AmazonInteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
