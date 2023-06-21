import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkuMappingComponent } from './sku-mapping.component';

describe('SkuMappingComponent', () => {
  let component: SkuMappingComponent;
  let fixture: ComponentFixture<SkuMappingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SkuMappingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SkuMappingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
