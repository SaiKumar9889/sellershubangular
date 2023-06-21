import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PackageSlipEditTemplateComponent } from './package-slip-edit-template.component';

describe('PackageSlipEditTemplateComponent', () => {
  let component: PackageSlipEditTemplateComponent;
  let fixture: ComponentFixture<PackageSlipEditTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PackageSlipEditTemplateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PackageSlipEditTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
