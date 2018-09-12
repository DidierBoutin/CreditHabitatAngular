import { TestBed, inject } from '@angular/core/testing';

import { DonneesService } from './donnees.service';

describe('DonneesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DonneesService]
    });
  });

  it('should be created', inject([DonneesService], (service: DonneesService) => {
    expect(service).toBeTruthy();
  }));
});
