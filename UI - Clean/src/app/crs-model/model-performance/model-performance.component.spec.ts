import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelPerformanceComponent } from './model-performance.component';

describe('ModelPerformanceComponent', () => {
  let component: ModelPerformanceComponent;
  let fixture: ComponentFixture<ModelPerformanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModelPerformanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelPerformanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
