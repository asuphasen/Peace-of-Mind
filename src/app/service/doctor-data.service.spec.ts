import { TestBed } from '@angular/core/testing';

import { DoctorDataService } from './doctor-data.service';

describe('DoctorDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DoctorDataService = TestBed.get(DoctorDataService);
    expect(service).toBeTruthy();
  });
});
