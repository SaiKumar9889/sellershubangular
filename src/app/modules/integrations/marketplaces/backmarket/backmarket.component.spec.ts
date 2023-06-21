import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackmarketComponent } from './backmarket.component';

describe('BackmarketComponent', () => {
  let component: BackmarketComponent;
  let fixture: ComponentFixture<BackmarketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BackmarketComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BackmarketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
