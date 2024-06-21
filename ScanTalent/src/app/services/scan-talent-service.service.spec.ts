import { TestBed } from '@angular/core/testing';

import { ScanTalentServiceService } from './scan-talent-service.service';

describe('ScanTalentServiceService', () => {
  let service: ScanTalentServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScanTalentServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
