import { TestBed, inject } from '@angular/core/testing';

import { SocketProxyAgentService } from './socket-proxy-agent.service';

describe('SocketProxyAgentService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SocketProxyAgentService]
    });
  });

  it('should be created', inject([SocketProxyAgentService], (service: SocketProxyAgentService) => {
    expect(service).toBeTruthy();
  }));
});
