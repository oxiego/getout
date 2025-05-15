import { TestBed } from '@angular/core/testing';

import { CategoriyService } from './categoriy.service';

describe('CategoriyService', () => {
  let service: CategoriyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CategoriyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
