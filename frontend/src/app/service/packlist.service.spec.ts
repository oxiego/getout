import { TestBed } from '@angular/core/testing';

import { PacklistService } from './packlist.service';

describe('PacklistService', () => {
  let service: PacklistService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PacklistService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
