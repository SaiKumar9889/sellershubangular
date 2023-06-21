import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PackageSlipViewComponent } from './package-slip-view.component';

describe('PackageSlipViewComponent', () => {
  let component: PackageSlipViewComponent;
  let fixture: ComponentFixture<PackageSlipViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PackageSlipViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PackageSlipViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
