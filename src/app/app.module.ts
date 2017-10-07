import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AvamLog4jsLoggerModule } from 'avam-logger';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AvamLog4jsLoggerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
