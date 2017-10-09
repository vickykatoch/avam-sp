import { TestBed, inject } from '@angular/core/testing';

import { AppBootstrapperService } from './app-bootstrapper.service';

describe('AppBootstrapperService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AppBootstrapperService]
    });
  });

  it('should be created', inject([AppBootstrapperService], (service: AppBootstrapperService) => {
    expect(service).toBeTruthy();
  }));
});
