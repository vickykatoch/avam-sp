import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AvamLog4jsLoggerModule } from '@avam-logger/index';
import { AvamSocketProxyAgentModule } from "@socket-proxy-agent/index";
import { AvamCoreServicesModule } from '@avam-core-services/index';

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
