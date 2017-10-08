import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SocketProxyAgentService } from './socket-proxy-agent.service';
import { AvamLog4jsLoggerModule } from 'avam-logger';

export { SocketProxyAgentService } from './socket-proxy-agent.service';

@NgModule({
  imports: [
    CommonModule,
    AvamLog4jsLoggerModule
  ],
  declarations: [],
  providers : [ 
    SocketProxyAgentService
  ]
})
export class SocketProxyAgentModule { }
