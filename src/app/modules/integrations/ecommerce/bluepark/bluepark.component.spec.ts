import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlueparkComponent } from './bluepark.component';

describe('BlueparkComponent', () => {
  let component: BlueparkComponent;
  let fixture: ComponentFixture<BlueparkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlueparkComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BlueparkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
