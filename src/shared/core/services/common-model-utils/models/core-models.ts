import { UserResource } from './core-models';

export interface ApplicationInfo {
      name              : string;
      user              : string;
      type              : string;
      env               : string;
      region            : string;
      version           : string;      
}

export const MAIN_APP_NAME = "AVAM-MAIN-APP";

export interface UserInfo {
      id                : string;
      name              : string;
      apps              : {[key: string] : UserAppInfo};
}

export class UserAppInfo {
      name              : string;
      isActive          : boolean;
      isDynamic?        : boolean;
      resources         : {[key: string] : UserResource};
      layout?           : any;
}

export interface UserResource {
      name              : string;
      caption           : string;
      type              : string; // Resource Type
      permission        : number;
      isActive          : boolean;
      icon?             : string;
      component?        : string;
      resources?        : {[key: string] : UserResource};
}

export const ResourceType = Object.freeze({
      MENU              : 'MENU',
      ACTION_ITEM       : 'ACTION_ITEM',
      ITEM              : 'ITEM'
});