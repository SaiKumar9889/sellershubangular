import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenskyComponent } from './opensky.component';

describe('OpenskyComponent', () => {
  let component: OpenskyComponent;
  let fixture: ComponentFixture<OpenskyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpenskyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OpenskyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
