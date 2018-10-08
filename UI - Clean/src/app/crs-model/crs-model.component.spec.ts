import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrsModelComponent } from './crs-model.component';

describe('CrsModelComponent', () => {
  let component: CrsModelComponent;
  let fixture: ComponentFixture<CrsModelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrsModelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrsModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
