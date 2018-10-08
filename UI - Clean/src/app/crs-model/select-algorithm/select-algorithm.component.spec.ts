import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectAlgorithmComponent } from './select-algorithm.component';

describe('SelectAlgorithmComponent', () => {
  let component: SelectAlgorithmComponent;
  let fixture: ComponentFixture<SelectAlgorithmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectAlgorithmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectAlgorithmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
