import { TestBed } from '@angular/core/testing';

import { TipsDataService } from './tips-data.service';

describe('TipsDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TipsDataService = TestBed.get(TipsDataService);
    expect(service).toBeTruthy();
  });
});
