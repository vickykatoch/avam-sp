import { Injectable } from '@angular/core';
import { ApplicationLoggingService, ApplicationLogger, LogLevel } from '../../common/logger-core/index';
import { 
  Logger, getRootLogger, Appender, BrowserConsoleAppender, PatternLayout, getLogger 
} from 'log4javascript';
import { Log4JsLoggerAdapter } from './log4js-logger-adapter';



@Injectable()
export class AvamLog4jsLoggerAdapterService extends ApplicationLoggingService {
  private rootLogger : Logger;

  
  
  constructor() {
    super();
    this.setupLogger();
  }

  getLogger(name: string, level?: LogLevel): ApplicationLogger {
    return new Log4JsLoggerAdapter(getLogger(name), level);    
  }

  /**************************HELPER METHODS [STARTS HERE] */
  private setupLogger() : void {
    this.rootLogger = getRootLogger();
    this.rootLogger.addAppender(this.createBrowserConsoleAppender());
  }
  private createBrowserConsoleAppender() : Appender {
    const browserConsoleAppender = new BrowserConsoleAppender();
    const layout = new PatternLayout("%d{yyyy-MM-dd HH:mm:ss.SSS} [%-5p] [%c] [%f{1}]- %m%n");
    layout.setKeys('src','ts','lvl','msg','ex', 'url');
    browserConsoleAppender.setLayout(layout);
    return browserConsoleAppender;
  }

  // private createAjaxAppender(url: string) : Appender {
  //   const ajaxAppender = new AjaxAppender(url);
  //   const layout = new JsonLayout(false,true);
  //   layout.setKeys('src','ts','lvl','msg','ex', 'url');
  //   ajaxAppender.addHeader('content-type' , 'application/json');
  //   ajaxAppender.setLayout(layout);
  //   return ajaxAppender;
  // }
  
  // private createWebWorkerAppender() : Appender {
  //   const appender  = new WebWorkerAppender(true,"assets/workers/logger-worker.js","J-LOGGER",10,10);

  //   const layout = appender.getLayout();
  //   layout.setKeys('src','ts','lvl','msg','ex', 'url');
  //   layout.setCustomField('user', 'bkatoch');
  //   appender.sessionId = 'MarketWatch';
  //   return appender;
  // }
  /**************************HELPER METHODS [ENDS HERE] */
}
