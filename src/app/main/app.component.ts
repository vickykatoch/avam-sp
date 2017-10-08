import { Component } from '@angular/core';
import { ApplicationLoggingService, ApplicationLogger } from 'avam-logger';
import { SocketMessageType } from 'common-model-utils';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';
  private logger : ApplicationLogger;
  private worker : Worker;

  constructor(loggingService: ApplicationLoggingService) {
    this.logger = loggingService.getLogger('AppComponent');
    this.logger.info('Hi There');
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
