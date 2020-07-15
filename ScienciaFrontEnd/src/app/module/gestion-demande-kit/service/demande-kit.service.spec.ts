import { TestBed } from '@angular/core/testing';

import { DemandeKitService } from './demande-kit.service';

describe('DemandeKitService', () => {
  let service: DemandeKitService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DemandeKitService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
