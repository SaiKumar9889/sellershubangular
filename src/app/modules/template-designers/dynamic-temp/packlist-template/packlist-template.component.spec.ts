import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PacklistTemplateComponent } from './packlist-template.component';

describe('PacklistTemplateComponent', () => {
  let component: PacklistTemplateComponent;
  let fixture: ComponentFixture<PacklistTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PacklistTemplateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PacklistTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
