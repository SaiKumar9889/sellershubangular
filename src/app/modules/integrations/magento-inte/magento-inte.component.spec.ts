import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MagentoInteComponent } from './magento-inte.component';

describe('MagentoInteComponent', () => {
  let component: MagentoInteComponent;
  let fixture: ComponentFixture<MagentoInteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MagentoInteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MagentoInteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
