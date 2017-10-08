import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AvamLog4jsLoggerModule } from 'avam-logger';
import { AvamSocketProxyAgentModule } from "socket-proxy-agent";
import { AvamCoreServicesModule } from 'avam-core-services';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AvamSocketProxyAgentModule,
    AvamLog4jsLoggerModule,
    AvamCoreServicesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
