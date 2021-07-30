import { TestBed } from '@angular/core/testing';

import { PortugalService } from './portugal.service';

describe('PortugalService', () => {
  let service: PortugalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PortugalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
