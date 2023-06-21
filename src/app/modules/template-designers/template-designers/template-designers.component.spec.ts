import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateDesignersComponent } from './template-designers.component';

describe('TemplateDesignersComponent', () => {
  let component: TemplateDesignersComponent;
  let fixture: ComponentFixture<TemplateDesignersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TemplateDesignersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TemplateDesignersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
