import { ApplicationContextService } from './application-context.service';
import { ConfigurationService } from './configuration.service';
import { UserPreferenceService } from './user-preference.service';
import { UserService } from './user.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { WorkspaceLayoutService } from './workspace-layout.service';
import { AppBootstrapperService } from './app-bootstrapper.service';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ], providers: [
    ConfigurationService,
    ApplicationContextService,
    UserPreferenceService,
    UserService,
    WorkspaceLayoutService,
    AppBootstrapperService
  ],
  declarations: []
})
export class AvamCoreServicesModule { }
