import { ApplicationContextService } from './application-context.service';
import { ConfigurationService } from './configuration.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ], providers : [
    ConfigurationService,
    ApplicationContextService
  ],
  declarations: []
})
export class AvamCoreServicesModule { }
