import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopWiredComponent } from './shop-wired.component';

describe('ShopWiredComponent', () => {
  let component: ShopWiredComponent;
  let fixture: ComponentFixture<ShopWiredComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShopWiredComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopWiredComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
