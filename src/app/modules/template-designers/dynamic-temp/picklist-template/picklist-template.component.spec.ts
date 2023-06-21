import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PicklistTemplateComponent } from './picklist-template.component';

describe('PicklistTemplateComponent', () => {
  let component: PicklistTemplateComponent;
  let fixture: ComponentFixture<PicklistTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PicklistTemplateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PicklistTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
