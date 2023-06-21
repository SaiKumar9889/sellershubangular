import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopeeComponent } from './shopee.component';

describe('ShopeeComponent', () => {
  let component: ShopeeComponent;
  let fixture: ComponentFixture<ShopeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShopeeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
