import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FruugoComponent } from './fruugo.component';

describe('FruugoComponent', () => {
  let component: FruugoComponent;
  let fixture: ComponentFixture<FruugoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FruugoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FruugoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
