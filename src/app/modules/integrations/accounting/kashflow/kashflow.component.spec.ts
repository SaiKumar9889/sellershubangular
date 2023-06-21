import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KashflowComponent } from './kashflow.component';

describe('KashflowComponent', () => {
  let component: KashflowComponent;
  let fixture: ComponentFixture<KashflowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KashflowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KashflowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
