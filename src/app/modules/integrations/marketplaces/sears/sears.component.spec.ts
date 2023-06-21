import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearsComponent } from './sears.component';

describe('SearsComponent', () => {
  let component: SearsComponent;
  let fixture: ComponentFixture<SearsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
