import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AiSubscriptionDashboardComponent } from './ai-subscription-dashboard.component';

describe('AiSubscriptionDashboardComponent', () => {
  let component: AiSubscriptionDashboardComponent;
  let fixture: ComponentFixture<AiSubscriptionDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AiSubscriptionDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AiSubscriptionDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
