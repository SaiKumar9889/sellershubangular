import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IofferComponent } from './ioffer.component';

describe('IofferComponent', () => {
  let component: IofferComponent;
  let fixture: ComponentFixture<IofferComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IofferComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IofferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
