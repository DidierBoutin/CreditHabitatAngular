import { TestBed, inject } from '@angular/core/testing';

import { AnomalieService } from './anomalie.service';

describe('AnomalieService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AnomalieService]
    });
  });

  it('should be created', inject([AnomalieService], (service: AnomalieService) => {
    expect(service).toBeTruthy();
  }));
});
