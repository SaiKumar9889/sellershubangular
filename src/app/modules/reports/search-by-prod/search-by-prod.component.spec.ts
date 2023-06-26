import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchByProdComponent } from './search-by-prod.component';

describe('SearchByProdComponent', () => {
  let component: SearchByProdComponent;
  let fixture: ComponentFixture<SearchByProdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchByProdComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchByProdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
