import { Component, OnInit } from '@angular/core';
import { ApplicationLoggingService, ApplicationLogger } from '@avam-logger/index';
import { SocketMessageType } from '@common-model-utils/index';
import { AppBootstrapperService } from '@avam-core-services/index';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'app';
  private logger : ApplicationLogger;
  private worker : Worker;

  constructor(loggingService: ApplicationLoggingService, private appBootStrapper : AppBootstrapperService) {
    this.logger = loggingService.getLogger('AppComponent');
    this.logger.info('Hi There');

    // appContextService.getApplicationInfo().then((appInfo)=> {
    //   this.logger.info('Application Info : ', JSON.stringify(appInfo));
    // },error=> console.error);

    
    // this.initWorker();
  }

  ngOnInit() {
    this.appBootStrapper.bootstrap('X23423','XNA','DEV');
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
