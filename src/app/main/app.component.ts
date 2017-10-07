import { Component } from '@angular/core';
import { ApplicationLoggingService, ApplicationLogger } from 'avam-logger';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';
  private logger : ApplicationLogger;

  constructor(loggingService: ApplicationLoggingService) {
    this.logger = loggingService.getLogger('AppComponent');
    this.logger.info('Hi There');
  }
}
