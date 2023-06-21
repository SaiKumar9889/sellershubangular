import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopcluesComponent } from './shopclues.component';

describe('ShopcluesComponent', () => {
  let component: ShopcluesComponent;
  let fixture: ComponentFixture<ShopcluesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShopcluesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopcluesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
