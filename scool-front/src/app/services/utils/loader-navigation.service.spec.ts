import { TestBed } from '@angular/core/testing';

import { LoaderNavigationService } from './loader-navigation.service';

describe('LoaderNavigationService', () => {
  let service: LoaderNavigationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoaderNavigationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
