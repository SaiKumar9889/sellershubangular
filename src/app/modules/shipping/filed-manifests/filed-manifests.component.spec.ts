import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiledManifestsComponent } from './filed-manifests.component';

describe('FiledManifestsComponent', () => {
  let component: FiledManifestsComponent;
  let fixture: ComponentFixture<FiledManifestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FiledManifestsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FiledManifestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
