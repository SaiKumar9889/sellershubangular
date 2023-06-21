import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountingInteComponent } from './accounting-inte.component';

describe('AccountingInteComponent', () => {
  let component: AccountingInteComponent;
  let fixture: ComponentFixture<AccountingInteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountingInteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountingInteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
