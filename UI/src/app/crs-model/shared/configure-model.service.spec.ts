import { TestBed, inject } from '@angular/core/testing';

import { ConfigureModelService } from './configure-model.service';

describe('ConfigureModelService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ConfigureModelService]
    });
  });

  it('should be created', inject([ConfigureModelService], (service: ConfigureModelService) => {
    expect(service).toBeTruthy();
  }));
});
