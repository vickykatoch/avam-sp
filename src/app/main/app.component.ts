import { Component } from '@angular/core';
import { ApplicationLoggingService, ApplicationLogger } from '@avam-logger/index';
import { SocketMessageType } from '@common-model-utils/index';
import { ApplicationContextService } from '@avam-core-services/index';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';
  private logger : ApplicationLogger;
  private worker : Worker;

  constructor(loggingService: ApplicationLoggingService, appContextService : ApplicationContextService) {
    this.logger = loggingService.getLogger('AppComponent');
    this.logger.info('Hi There');

    appContextService.getApplicationInfo().then((appInfo)=> {
      this.logger.info('Application Info : ', JSON.stringify(appInfo));
    },error=> console.error);

    appContextService.name = "AVAM-MAIN";
    appContextService.appType = "MAIN";
    appContextService.region = "XNA";
    appContextService.version = "1.0.0-beta";
    appContextService.environment = "DEV";

    this.initWorker();
  }

  private initWorker() {
    this.worker = new Worker('assets/workers/socket-loader.js');
    this.worker.addEventListener('message', (e: MessageEvent)=> {
      console.log(e.data);
      this.worker.postMessage({
        type : SocketMessageType.INITIALIZE,
        sender : 'MAIN',
        ts : Date.now(),
        payload : {
          name : 'WKR',
          appInfo : 'Hi There'
        }
      });
    });
    
    
  }
}
