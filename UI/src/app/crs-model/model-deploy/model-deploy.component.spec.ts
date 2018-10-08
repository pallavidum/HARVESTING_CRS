import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelDeployComponent } from './model-deploy.component';

describe('ModelDeployComponent', () => {
  let component: ModelDeployComponent;
  let fixture: ComponentFixture<ModelDeployComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModelDeployComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelDeployComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
