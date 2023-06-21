import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Magento2InteComponent } from './magento2-inte.component';

describe('Magento2InteComponent', () => {
  let component: Magento2InteComponent;
  let fixture: ComponentFixture<Magento2InteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Magento2InteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Magento2InteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
