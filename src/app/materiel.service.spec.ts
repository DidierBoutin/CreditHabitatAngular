import { TestBed, inject } from '@angular/core/testing';

import { MaterielService } from './materiel.service';

describe('MaterielService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MaterielService]
    });
  });

  it('should be created', inject([MaterielService], (service: MaterielService) => {
    expect(service).toBeTruthy();
  }));
});
