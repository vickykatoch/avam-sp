import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AvamLog4jsLoggerAdapterService } from './log4js-logger-adapter.service';
import { ApplicationLoggingService } from '../../common/logger-core/index';


export * from '../../common/logger-core/index';
export { AvamLog4jsLoggerAdapterService } from './log4js-logger-adapter.service';


@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers : [
    { provide : ApplicationLoggingService, useClass : AvamLog4jsLoggerAdapterService }
  ]
})
export class AvamLog4jsLoggerModule { }
