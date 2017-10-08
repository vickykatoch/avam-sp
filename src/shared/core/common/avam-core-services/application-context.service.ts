import { ConfigurationService } from './configuration.service';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ApplicationInfo } from "common-model-utils";
import "rxjs/add/operator/first";

@Injectable()
export class ApplicationContextService {
  private appInfoNotifier     = new BehaviorSubject<ApplicationInfo>(null);
  appInfo$                    = this.appInfoNotifier.asObservable();

  constructor(private configService : ConfigurationService) { }

  getApplicationInfo() : Promise<ApplicationInfo> {
    return new Promise<ApplicationInfo>((resolve,reject)=> {
      this.appInfo$.first(x=> x!==null).subscribe(resolve,reject);
    });
  }

}
