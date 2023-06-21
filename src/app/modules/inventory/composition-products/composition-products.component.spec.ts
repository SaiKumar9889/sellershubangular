import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompositionProductsComponent } from './composition-products.component';

describe('CompositionProductsComponent', () => {
  let component: CompositionProductsComponent;
  let fixture: ComponentFixture<CompositionProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompositionProductsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompositionProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
