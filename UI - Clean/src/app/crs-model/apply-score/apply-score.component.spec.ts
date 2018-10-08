import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplyScoreComponent } from './apply-score.component';

describe('ApplyScoreComponent', () => {
  let component: ApplyScoreComponent;
  let fixture: ComponentFixture<ApplyScoreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApplyScoreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplyScoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
