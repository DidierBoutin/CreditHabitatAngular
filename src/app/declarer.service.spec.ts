import { TestBed, inject } from '@angular/core/testing';

import { DeclarerService } from './declarer.service';

describe('DeclarerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DeclarerService]
    });
  });

  it('should be created', inject([DeclarerService], (service: DeclarerService) => {
    expect(service).toBeTruthy();
  }));
});
