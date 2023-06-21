import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListingErrorsComponent } from './listing-errors.component';

describe('ListingErrorsComponent', () => {
  let component: ListingErrorsComponent;
  let fixture: ComponentFixture<ListingErrorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListingErrorsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListingErrorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
