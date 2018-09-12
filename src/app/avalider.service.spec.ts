import { TestBed, inject } from '@angular/core/testing';

import { AvaliderService } from './avalider.service';

describe('AvaliderService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AvaliderService]
    });
  });

  it('should be created', inject([AvaliderService], (service: AvaliderService) => {
    expect(service).toBeTruthy();
  }));
});
