import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ApplicationInfo, CoreModelHelper, CommonUtils, MAIN_APP_NAME } from "@common-model-utils/index";
import { ApplicationLogger, ApplicationLoggingService } from '@avam-logger/index';

import "rxjs/add/operator/first";
import { UserPreferenceService } from './user-preference.service';
import { UserService } from './user.service';
import { WorkspaceLayoutService } from './workspace-layout.service';

@Injectable()
export class ApplicationContextService {
  private appInfoNotifier = new BehaviorSubject<ApplicationInfo>(null);
  private appReadyNotifier = new BehaviorSubject<boolean>(false);
  private appInfo = CoreModelHelper.instance.appInfoHelper.emptyAppInfo;
  appInfo$ = this.appInfoNotifier.asObservable();
  isAppReady$ = this.appReadyNotifier.asObservable();

  constructor(private userPreferenceService: UserPreferenceService, private userService : UserService, private appLayoutService : WorkspaceLayoutService) {

  }

  getApplicationInfo(): Promise<ApplicationInfo> {
    return new Promise<ApplicationInfo>((resolve, reject) => {
      this.appInfo$.first(x => x !== null).subscribe(resolve, reject);
    });
  }

  isMainApp() : boolean {
    CommonUtils.instance.throwIfTrue(!this.appReadyNotifier.getValue(), 'Application is not yet ready. Please wait for app to ready before checking if it is a main app');
    return this.appInfo.name === MAIN_APP_NAME;
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
  set user(value: string) {
    this.appInfo.user = value;
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
  private bootStrapCoreServices() {
    this.appInfoNotifier.first(x=>x!==null).subscribe(appInfo=> {
      if(this.appInfo.name === MAIN_APP_NAME) {
        this.authenticateAndLoadUser(this.appInfo.user);
      } else {
        // Agents - no need to do anything
      }
    });
  }
  private authenticateAndLoadUser(userId: string) {
    // this.userService.signIn(this.appInfo.user).then(this.onUserLoaded).catch(console.error);
  }
  private onUserLoaded(userInfo) {
    // TODO : 1 Loaded this.userPreferenceService
    // 2. Load UserWorkspace
    // 3. Merge streams and wait for completion
    // 4. Once finished, notify app is ready
  }
  //#endregion

}
