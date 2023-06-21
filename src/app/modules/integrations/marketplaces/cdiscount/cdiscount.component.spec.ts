import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CdiscountComponent } from './cdiscount.component';

describe('CdiscountComponent', () => {
  let component: CdiscountComponent;
  let fixture: ComponentFixture<CdiscountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CdiscountComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CdiscountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
