import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EkmpowershopComponent } from './ekmpowershop.component';

describe('EkmpowershopComponent', () => {
  let component: EkmpowershopComponent;
  let fixture: ComponentFixture<EkmpowershopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EkmpowershopComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EkmpowershopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
