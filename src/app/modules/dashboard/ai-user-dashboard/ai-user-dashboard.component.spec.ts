import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AiUserDashboardComponent } from './ai-user-dashboard.component';

describe('AiUserDashboardComponent', () => {
  let component: AiUserDashboardComponent;
  let fixture: ComponentFixture<AiUserDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AiUserDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AiUserDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
