import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElevenstreetComponent } from './elevenstreet.component';

describe('ElevenstreetComponent', () => {
  let component: ElevenstreetComponent;
  let fixture: ComponentFixture<ElevenstreetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ElevenstreetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ElevenstreetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
