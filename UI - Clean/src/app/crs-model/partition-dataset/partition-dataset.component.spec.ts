import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartitionDatasetComponent } from './partition-dataset.component';

describe('PartitionDatasetComponent', () => {
  let component: PartitionDatasetComponent;
  let fixture: ComponentFixture<PartitionDatasetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartitionDatasetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartitionDatasetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
