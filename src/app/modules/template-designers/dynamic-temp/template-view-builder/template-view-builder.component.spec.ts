import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateViewBuilderComponent } from './template-view-builder.component';

describe('TemplateViewBuilderComponent', () => {
  let component: TemplateViewBuilderComponent;
  let fixture: ComponentFixture<TemplateViewBuilderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TemplateViewBuilderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TemplateViewBuilderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
