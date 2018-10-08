import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BellCurveComponent } from './bell-curve.component';

describe('BellCurveComponent', () => {
  let component: BellCurveComponent;
  let fixture: ComponentFixture<BellCurveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BellCurveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BellCurveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
