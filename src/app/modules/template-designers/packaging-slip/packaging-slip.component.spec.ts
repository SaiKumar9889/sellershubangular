import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PackagingSlipComponent } from './packaging-slip.component';

describe('PackagingSlipComponent', () => {
  let component: PackagingSlipComponent;
  let fixture: ComponentFixture<PackagingSlipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PackagingSlipComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PackagingSlipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
