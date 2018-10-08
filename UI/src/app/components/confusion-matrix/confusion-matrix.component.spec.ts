import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfusionMatrixComponent } from './confusion-matrix.component';

describe('ConfusionMatrixComponent', () => {
  let component: ConfusionMatrixComponent;
  let fixture: ComponentFixture<ConfusionMatrixComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfusionMatrixComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfusionMatrixComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});