import { TestBed, inject } from '@angular/core/testing';

import { RegroupementService } from './regroupement.service';

describe('RegroupementService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RegroupementService]
    });
  });

  it('should be created', inject([RegroupementService], (service: RegroupementService) => {
    expect(service).toBeTruthy();
  }));
});
