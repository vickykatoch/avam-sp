import { UserService } from './user.service';
import { ApplicationInfo, CommonUtils, CoreModelHelper } from '@common-model-utils/index';
import { Injectable } from '@angular/core';



@Injectable()
export class AppBootstrapperService {

  constructor(private userService : UserService) {

  }
  bootstrap(appInfo: ApplicationInfo): void {
    this.validateAppInfo(appInfo);
    this.userService.authenticate();
  }

  // #region Helper Methods
  private validateAppInfo(appInfo: ApplicationInfo) {
    let errorMessage = '';
    CoreModelHelper.instance.appInfoHelper.mandatoryProps.forEach(propName=> {
      if(CommonUtils.instance.isStringNullOrEmpty(appInfo[propName])) {
        errorMessage = `${errorMessage}${propName} is empty, `;
      }
    });
    CommonUtils.instance.throwIfTrue(!CommonUtils.instance.isStringNullOrEmpty(errorMessage), errorMessage);
  }
  // #endregion
}
