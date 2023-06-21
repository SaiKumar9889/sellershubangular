import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BolcomComponent } from './bolcom.component';

describe('BolcomComponent', () => {
  let component: BolcomComponent;
  let fixture: ComponentFixture<BolcomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BolcomComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BolcomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
