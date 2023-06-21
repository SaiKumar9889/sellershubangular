import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StorenvyComponent } from './storenvy.component';

describe('StorenvyComponent', () => {
  let component: StorenvyComponent;
  let fixture: ComponentFixture<StorenvyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StorenvyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StorenvyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
