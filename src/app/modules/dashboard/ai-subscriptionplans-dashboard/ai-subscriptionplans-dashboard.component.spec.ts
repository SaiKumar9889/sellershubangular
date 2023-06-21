import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AiSubscriptionplansDashboardComponent } from './ai-subscriptionplans-dashboard.component';

describe('AiSubscriptionplansDashboardComponent', () => {
  let component: AiSubscriptionplansDashboardComponent;
  let fixture: ComponentFixture<AiSubscriptionplansDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AiSubscriptionplansDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AiSubscriptionplansDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
