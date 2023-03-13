import { TestBed } from '@angular/core/testing';

import { ErrorHandllingService } from './error-handlling.service';

describe('ErrorHandllingService', () => {
  let service: ErrorHandllingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ErrorHandllingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
