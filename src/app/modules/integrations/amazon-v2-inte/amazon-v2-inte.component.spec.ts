import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AmazonV2InteComponent } from './amazon-v2-inte.component';

describe('AmazonV2InteComponent', () => {
  let component: AmazonV2InteComponent;
  let fixture: ComponentFixture<AmazonV2InteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AmazonV2InteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AmazonV2InteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
