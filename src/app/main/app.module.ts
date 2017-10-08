import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AvamLog4jsLoggerModule } from 'avam-logger';
import { SocketProxyAgentModule } from "socket-proxy-agent";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    SocketProxyAgentModule,
    AvamLog4jsLoggerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
