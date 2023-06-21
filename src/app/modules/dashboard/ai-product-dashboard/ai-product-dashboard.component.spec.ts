import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AiProductDashboardComponent } from './ai-product-dashboard.component';

describe('AiProductDashboardComponent', () => {
  let component: AiProductDashboardComponent;
  let fixture: ComponentFixture<AiProductDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AiProductDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AiProductDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
