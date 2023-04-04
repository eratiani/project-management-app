import { TestBed } from '@angular/core/testing';

import { BoardsRequestsService } from './boards-requests.service';

describe('BoardsRequestsService', () => {
  let service: BoardsRequestsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BoardsRequestsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
 