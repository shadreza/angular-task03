import { TestBed } from '@angular/core/testing';

import { TalkWithApiService } from './talk-with-api.service';

describe('TalkWithApiService', () => {
  let service: TalkWithApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TalkWithApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
