import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AieChartCardComponent } from './aie-chart-card.component';

describe('AieChartCardComponent', () => {
  let component: AieChartCardComponent;
  let fixture: ComponentFixture<AieChartCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AieChartCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AieChartCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
