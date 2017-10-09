import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ApplicationInfo, CoreModelHelper, CommonUtils } from "@common-model-utils/index";
import { ApplicationLogger, ApplicationLoggingService } from '@avam-logger/index';

import "rxjs/add/operator/first";


@Injectable()
export class ApplicationContextService {
  private appInfoNotifier = new BehaviorSubject<ApplicationInfo>(null);
  private appInfo = CoreModelHelper.instance.appInfoHelper.emptyAppInfo;
  appInfo$ = this.appInfoNotifier.asObservable();

  constructor() {
  }

  getApplicationInfo(): Promise<ApplicationInfo> {
    return new Promise<ApplicationInfo>((resolve, reject) => {
      this.appInfo$.first(x => x !== null).subscribe(resolve, reject);
    });
  }

  //#region Application Info Property Writers
  set name(value: string) {
    this.appInfo.name = value;
    this.notifyWhenFinished();
  }
  set environment(value: string) {
    this.appInfo.env = value;
    this.notifyWhenFinished();
  }
  set appType(value: string) {
    this.appInfo.type = value;
    this.notifyWhenFinished();
  }
  set region(value: string) {
    this.appInfo.region = value;
    this.notifyWhenFinished();
  }
  set version(value: string) {
    this.appInfo.version = value;
    this.notifyWhenFinished();
  }
  //#endregion

  //#region Helper Methods
  private notifyWhenFinished() {
    const propKeys = Object.keys(this.appInfo);
    let isEmpty = false;

    for (let i = 0; i < propKeys.length - 1; i++) {
      const property = propKeys[i];
      if (this.appInfo.hasOwnProperty(property)) {
        isEmpty = CommonUtils.instance.isStringNullOrEmpty(this.appInfo[property], true);
        if (isEmpty) {
          break;
        }
      }
    }
    if (!isEmpty) {
      const waitHandle = setTimeout(() => {
        clearTimeout(waitHandle);
        this.appInfoNotifier.next(this.appInfo);
      }, 0);
    }
  }

  //#endregion

}
