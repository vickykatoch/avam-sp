import { TestBed, inject } from '@angular/core/testing';

import { AvamLog4jsLoggerAdapterService } from './log4js-logger-adapter.service';

describe('AvamLog4jsLoggerAdapterService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AvamLog4jsLoggerAdapterService]
    });
  });

  it('should be created', inject([AvamLog4jsLoggerAdapterService], (service: AvamLog4jsLoggerAdapterService) => {
    expect(service).toBeTruthy();
  }));
});
