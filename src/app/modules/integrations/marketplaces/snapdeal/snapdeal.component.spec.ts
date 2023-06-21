import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SnapdealComponent } from './snapdeal.component';

describe('SnapdealComponent', () => {
  let component: SnapdealComponent;
  let fixture: ComponentFixture<SnapdealComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SnapdealComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SnapdealComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
