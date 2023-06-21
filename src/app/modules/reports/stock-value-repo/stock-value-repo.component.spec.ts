import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StockValueRepoComponent } from './stock-value-repo.component';

describe('StockValueRepoComponent', () => {
  let component: StockValueRepoComponent;
  let fixture: ComponentFixture<StockValueRepoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StockValueRepoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StockValueRepoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
