import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebshipperComponent } from './webshipper.component';

describe('WebshipperComponent', () => {
  let component: WebshipperComponent;
  let fixture: ComponentFixture<WebshipperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebshipperComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebshipperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
