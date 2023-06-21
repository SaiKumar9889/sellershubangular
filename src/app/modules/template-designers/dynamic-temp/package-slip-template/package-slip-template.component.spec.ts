import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PackageSlipTemplateComponent } from './package-slip-template.component';

describe('PackageSlipTemplateComponent', () => {
  let component: PackageSlipTemplateComponent;
  let fixture: ComponentFixture<PackageSlipTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PackageSlipTemplateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PackageSlipTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
