import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UspostalserviceComponent } from './uspostalservice.component';

describe('UspostalserviceComponent', () => {
  let component: UspostalserviceComponent;
  let fixture: ComponentFixture<UspostalserviceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UspostalserviceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UspostalserviceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
