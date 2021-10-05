import { TestBed } from '@angular/core/testing';

import { DailyPlaysService } from './daily-plays.service';

describe('DailyPlaysService', () => {
  let service: DailyPlaysService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DailyPlaysService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
