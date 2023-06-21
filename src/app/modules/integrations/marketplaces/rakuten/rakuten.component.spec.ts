import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RakutenComponent } from './rakuten.component';

describe('RakutenComponent', () => {
  let component: RakutenComponent;
  let fixture: ComponentFixture<RakutenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RakutenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RakutenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
