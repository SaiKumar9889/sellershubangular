import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralsettingTaxComponent } from './generalsetting-tax.component';

describe('GeneralsettingTaxComponent', () => {
  let component: GeneralsettingTaxComponent;
  let fixture: ComponentFixture<GeneralsettingTaxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeneralsettingTaxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneralsettingTaxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
