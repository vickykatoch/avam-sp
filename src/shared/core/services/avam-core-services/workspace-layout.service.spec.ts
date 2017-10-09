import { TestBed, inject } from '@angular/core/testing';

import { WorkspaceLayoutService } from './workspace-layout.service';

describe('WorkspaceLayoutService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WorkspaceLayoutService]
    });
  });

  it('should be created', inject([WorkspaceLayoutService], (service: WorkspaceLayoutService) => {
    expect(service).toBeTruthy();
  }));
});
