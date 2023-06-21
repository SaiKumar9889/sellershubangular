import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClickAndCollectComponent } from './click-and-collect.component';

describe('ClickAndCollectComponent', () => {
  let component: ClickAndCollectComponent;
  let fixture: ComponentFixture<ClickAndCollectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClickAndCollectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClickAndCollectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
