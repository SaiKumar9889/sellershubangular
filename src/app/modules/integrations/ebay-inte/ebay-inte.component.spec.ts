import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EbayInteComponent } from './ebay-inte.component';

describe('EbayInteComponent', () => {
  let component: EbayInteComponent;
  let fixture: ComponentFixture<EbayInteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EbayInteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EbayInteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
