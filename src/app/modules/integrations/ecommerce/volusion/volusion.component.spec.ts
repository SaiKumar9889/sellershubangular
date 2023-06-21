import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VolusionComponent } from './volusion.component';

describe('VolusionComponent', () => {
  let component: VolusionComponent;
  let fixture: ComponentFixture<VolusionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VolusionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VolusionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
